import { Payment } from "mercadopago"
import { mercadopago } from "@/lib/mercadopago"
import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const payment_id = body.data.id

    if (!payment_id) {
      throw new Error("The data.id is required")
    }

    const payment = await new Payment(mercadopago).get({ id: body.data.id });

    
    if(!payment) {
      throw new Error("Payment not found");
    }
    
    const { external_reference } = payment;
    // const external_resource_url = transaction_details?.external_resource_url;

    const order = await prisma.order.findFirst({ where: {id: external_reference} });
    if(!order) {
      throw new Error("Order not found");
    }

    // Emit socket event based on payment status
    switch (payment.status) {
      case "approved":
        await prisma.order.update({
          where: { id: order.id },
          data: { paymentStatus: "PAYED" },
        });
        break
      case "pending":
        await prisma.order.update({ 
          where: { id: order.id },
          data: { paymentStatus: "PENDING"}
        });
        break
      case "in_process":
        await prisma.order.update({ 
          where: { id: order.id },
          data: { paymentStatus: "IN_PROCESS"}
        });
        break
      case "rejected":
        await prisma.order.update({
          where: { id: order.id },
          data: { paymentStatus: "REJECTED"}
        });
        break;
      case "cancelled":
        await prisma.order.update({
          where: { id: order.id },
          data: { paymentStatus: "CANCELLED"}
        });
        break
      case "refunded":
        await prisma.order.update({
          where: { id: order.id },
          data: { paymentStatus: "REFUNDED"}
        });
        break
      case "charged_back":
        await prisma.order.update({
          where: { id: order.id },
          data: { paymentStatus: "CHARGED_BACK"}
        });
        break
      default:
        await prisma.order.update({
          where: { id: order.id },
          data: { paymentStatus: "UNKNOWN"}
        });
        break
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Payment webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

