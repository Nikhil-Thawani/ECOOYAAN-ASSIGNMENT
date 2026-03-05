"use client";

import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext<any>(null);

export function CheckoutProvider({ children }: any) {
const [shippingData, setShippingData] = useState(null);

return (
<CheckoutContext.Provider value={{ shippingData, setShippingData }}>
{children}
</CheckoutContext.Provider>
);
}

export function useCheckout() {
return useContext(CheckoutContext);
}
