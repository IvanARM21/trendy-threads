
export const emailPattern = () => /^\S+@\S+$/i;

export const getFormState = (type: "error" | "loading" | "success" | "initial", message : string | undefined = "") => {
    switch(type) {
        case "error": return { isError: true, isSuccess: false, message, isLoading: false }
        case "loading": return { isError: false, isSuccess: false, message, isLoading: true }
        case "success": return { isError: false, isSuccess: true, message, isLoading: false }
        default: return { isError: false, isSuccess: false, message: "", isLoading: false,}
    }
}

export const formattCurrency = (currency: number) => Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
}).format(currency)

export const getTaxPrice = (amount : number) => amount*.21;
export const getShippingPrice = () => 12.99;
export const 
calculateDiscount = (amount : number, discount : number) => amount-(amount*discount);