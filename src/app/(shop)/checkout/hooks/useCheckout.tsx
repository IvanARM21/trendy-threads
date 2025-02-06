import { Session } from "next-auth";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart";
import { createUserAddress, getUserAddresses } from "@/actions/user/address";
import { createOrder } from "@/actions/order/createOrder";
import { INITIAL_ALERT } from "@/constants";
import { UserAddress } from "@/interfaces/user.interface";
import { AlertMessage } from "@/interfaces/general.interface";
import { CreateOrder } from "@/interfaces/payment.interface";

export const useCheckout = (session: Session | null) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOrder>();

  const { cartProduct } = useCartStore();
  const [isLoading] = useState(false);
  const [userAddresses, setUserAddresses] = useState<UserAddress[]>([]);
  const [addressSelected, setAddressSelected] = useState<UserAddress | null>(
    null
  );
  const [newAddress, setNewAddress] = useState(false);
  const [alert, setAlert] = useState<AlertMessage>(INITIAL_ALERT);

  useEffect(() => {
    const userAddresses = async () => {
      if (!userAddresses.length) {
        const addresses = await getUserAddresses(session?.user.id ?? "");
        setUserAddresses(addresses);
      }
    };
    userAddresses();
  }, [session?.user.id]);

  const onSubmit = async (formData: CreateOrder) => {
    try {
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
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return {
    handleSubmit,
    onSubmit,
    register,
    errors,
    isLoading,
    userAddresses,
    newAddress,
    setNewAddress,
    alert,
    setAlert,
    setAddressSelected,
    addressSelected,
  };
};
