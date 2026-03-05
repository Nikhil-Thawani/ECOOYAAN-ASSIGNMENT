
"use client";
import { useCheckout } from "../context/CheckoutContext";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {

  const router = useRouter();
  const { setShippingData } = useCheckout();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    pin: "",
    city: "",
    state: ""
  });

  const handleChange = (e:any) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();

    if (!form.email.includes("@")) {
    alert("Invalid email");
    return;
}
    if(form.phone.length !== 10){
      alert("Phone number must be 10 digits");
      return;
    }

    setShippingData(form);

    router.push("/payment");
  };

  return (
    <div className="p-10">

      <h1 className="text-2xl mb-6">Shipping Address</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96">

        <input name="name" placeholder="Full Name" onChange={handleChange} required/>

        <input name="email" placeholder="Email" onChange={handleChange} required/>

        <input name="phone" placeholder="Phone Number" onChange={handleChange} required/>

        <input name="pin" placeholder="PIN Code" onChange={handleChange} required/>

        <input name="city" placeholder="City" onChange={handleChange} required/>

        <input name="state" placeholder="State" onChange={handleChange} required/>

        <button className="bg-green-600 text-white p-2 rounded">
          Continue to Payment
        </button>

      </form>

    </div>
  );
}