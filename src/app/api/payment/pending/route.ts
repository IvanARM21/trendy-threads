import { NextRequest, NextResponse } from "next/server";
import { mercadopago } from "@/lib/mercadopago";
import { Payment } from "mercadopago";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const data = {
    payment_id: searchParams.get("payment_id"),
    external_reference: searchParams.get("external_reference"),
  };
  const { payment_id, external_reference } = data;

  if (!payment_id || !external_reference) {
    return NextResponse.json({ error: true, message: "Invalid payment data" }, { status: 400 });
  }

  const payment = await new Payment(mercadopago).get({ id: payment_id });

  const order = await prisma.order.findFirst({ where: { id: external_reference }});

  if(!order) redirect(`/?order_id=null&not_found=true`);

  if(payment.status === "in_process") {
    await prisma.order.update({
      where: { id: external_reference },
      data: { status: "PENDING" },
    });
    redirect(`/?order_id=${external_reference}`);
  }
  return redirect(`/?order_id=${external_reference}`);
}
