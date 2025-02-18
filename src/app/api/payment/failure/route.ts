import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const data = {
    payment_id: searchParams.get("payment_id"),
    external_reference: searchParams.get("external_reference"),
    collection_status: searchParams.get("collection_status"),
  };

  const {  external_reference, collection_status } = data;

  if (!external_reference) {
    return NextResponse.json({ error: true, message: "Invalid order reference" }, { status: 400 });
  }

  const order = await prisma.order.findFirst({ where: { id: external_reference } });

  if (!order) {
    return redirect(`/?order_id=null&not_found=true`);
  }

  if (collection_status === "failure") {
    await prisma.order.update({
      where: { id: external_reference },
      data: { paymentStatus: "REJECTED" },
    });
    return redirect(`/?order_id=${external_reference}&status=failure`);
  }

  return redirect(`/?order_id=${external_reference}`);
}
