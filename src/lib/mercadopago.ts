import { MercadoPagoConfig, Preference } from "mercadopago";
import { ProductItem } from "@/actions/order/createOrder";
import { calculateDiscount } from "@/utils";

const mercadopago = new MercadoPagoConfig({ 
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN ?? "",
    options: { timeout: 5000, idempotencyKey: "abc" }
});

export { mercadopago }

export const createPayment = async (
    items: ProductItem[],
    orderId: string,
    tax: number,
    shipping: number,
    discountPercentage: number
) => {
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discountAmount = subtotal-calculateDiscount(subtotal, discountPercentage);

    const paymentItems = [
        // Agregar productos
        ...items.map(({ id, price, quantity, name, size }) => ({
            id: id, // ✅ Se mantiene el ID del producto
            title: `${name} - ${size.size?.label}`,
            unit_price: price,
            quantity: quantity,
            currency_id: "UYU",
        })),
        // Agregar costo de envío (con ID único)
        {
            id: "shipping", // ✅ Se asigna un ID único
            title: "Shipping",
            unit_price: shipping,
            quantity: 1,
            currency_id: "UYU",
        },
        // Agregar impuestos (con ID único)
        {
            id: "taxes", // ✅ Se asigna un ID único
            title: "Taxes",
            unit_price: tax,
            quantity: 1,
            currency_id: "UYU",
        },
    ];

    // Si hay descuento, lo agregamos con un ID
    if (discountAmount > 0) {
        paymentItems.push({
            id: "discount", // ✅ Se asigna un ID único
            title: "Discount (-10%)",
            unit_price: -discountAmount,
            quantity: 1,
            currency_id: "UYU",
        });
    }

    const preference = await new Preference(mercadopago).create({
        body: {
            items: paymentItems,
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
};
