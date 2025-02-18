import { Session } from "next-auth";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart";
import { createUserAddress } from "@/actions/user/address";
import { createOrder } from "@/actions/order/createOrder";
import { INITIAL_ALERT } from "@/constants";
import { UserAddress } from "@/interfaces/user.interface";
import { AlertMessage } from "@/interfaces/general.interface";
import { CreateOrder } from "@/interfaces/payment.interface";
import { useRouter } from "next/navigation";

export const useCheckout = (
  session: Session | null,
  userAddresses: UserAddress[]
) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOrder>();

  const { cartProduct, clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [addressSelected, setAddressSelected] = useState<UserAddress | null>(
    null
  );
  const [newAddress, setNewAddress] = useState(false);
  const [alert, setAlert] = useState<AlertMessage>(INITIAL_ALERT);

  useEffect(() => {
    if (!cartProduct.length) {
      router.replace("/");
    }
  }, [cartProduct, router]);

  const onSubmit = async (formData: CreateOrder) => {
    try {
      setIsLoading(true);
      let addressId = addressSelected?.id;
      if (formData.saveUserAddress && !addressSelected) {
        const addressCreated = await createUserAddress({
          userId: session?.user.id ?? "",
          apartment: formData.apartment,
          address: formData.address,
          zip: formData.zip,
          city: formData.city,
          department: formData.department,
          country: formData.country,
          instructions: formData.instructions,
          phone: formData.phone,
        });
        addressId = addressCreated.id;
      }

      const orderedItems = cartProduct.map((item) => ({
        name: item.name,
        productId: item.id,
        quantity: item.quantity,
        size: item.size,
        price: item.price,
      }));

      const res = await createOrder(
        session?.user.id,
        orderedItems,
        addressId ?? ""
      );
      if (!res?.url)
        throw new Error("An error ocurred trying redirect to mercadopago");

      if (window) {
        window.location.href = res.url ?? "";
        setTimeout(() => {
          clearCart();
        }, 200);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSubmit,
    onSubmit,
    register,
    errors,
    isLoading,
    setIsLoading,
    userAddresses,
    newAddress,
    setNewAddress,
    alert,
    setAlert,
    setAddressSelected,
    addressSelected,
  };
};
