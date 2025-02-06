import { MercadoPagoConfig, Preference } from "mercadopago";
import { ProductItem } from "@/actions/order/createOrder";

const mercadopago = new MercadoPagoConfig({ 
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN ?? "",
    options: { timeout: 5000, idempotencyKey: "abc"
}});

export { mercadopago }

export const createPayment = async (items : ProductItem[], orderId: string) => {
    const preference = await new Preference(mercadopago).create({
        body: {
            items: items.map(({ id, price, quantity, name, size }) => ({
                title: `${name} - ${size.size?.label}`,
                unit_price: price,
                quantity: quantity,
                id: id,
                currency_id: "USD",
            })),
            external_reference: orderId,
            back_urls: {
                success: `${process.env.NEXTAUTH_URL}/api/payment/success`,
                failure: `${process.env.NEXTAUTH_URL}/api/payment/failure`,
                pending: `${process.env.NEXTAUTH_URL}/api/payment/pending`
            },
            auto_return: "approved"
        }
    });

    return preference.init_point;
}