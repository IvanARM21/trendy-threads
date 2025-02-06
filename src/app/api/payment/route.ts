import { Payment } from "mercadopago";

import { mercadopago } from "@/lib/mercadopago";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  const body = await req.json();
  console.log("Webhook body:", body);

  const payment_id = body.data.id;

  if(!payment_id) throw new Error("The data.id is required");

  const payment = await new Payment(mercadopago).get({ id: payment_id });

  console.log(payment.status)

  switch (payment.status) {
    case "approved":
      console.log("✅ Pago aprobado");
      // Lógica para marcar el pedido como pagado en la base de datos
      break;
    case "pending":
      console.log("⌛ Pago pendiente");
      // Lógica para pedidos en espera de pago
      break;
    case "in_process":
      console.log("🔍 Pago en proceso de revisión");
      // Lógica para pagos en revisión
      break;
    case "rejected":
      console.log("❌ Pago rechazado");
      // Lógica para pedidos con pago rechazado
      break;
    case "cancelled":
      console.log("🚫 Pago cancelado");
      // Lógica para pedidos cancelados
      break;
    case "refunded":
      console.log("💰 Pago reembolsado");
      // Lógica para pedidos con reembolso
      break;
    case "charged_back":
      console.log("⚠️ Pago con contracargo");
      // Lógica para manejar contracargos
      break;
    default:
      console.log("⚠️ Estado de pago desconocido:", payment.status);
      // Lógica para manejar estados inesperados
      break;
  }

  return NextResponse.json("It's good");
}