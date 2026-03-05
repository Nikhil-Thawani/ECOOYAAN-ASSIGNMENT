

"use client";
import { useCheckout } from "../context/CheckoutContext";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  const { shippingData } = useCheckout();
  const handlePayment = () => {
    // Simulate payment success
    router.push("/success");
  };

  return (
    <div className="p-10 max-w-xl mx-auto">

      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-4">
        Payment Confirmation
      </h1>

      <p className="text-gray-600 mb-6">
        Please confirm your order before proceeding with payment.
      </p>
      <div className="border p-4 rounded mb-6">
  <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>

{shippingData ? (
<> <p>{shippingData.name}</p> <p>{shippingData.email}</p> <p>{shippingData.phone}</p> <p>{shippingData.city}, {shippingData.state}</p> <p>PIN: {shippingData.pin}</p>
</>
) : ( <p>No shipping address available</p>
)}

</div>

      {/* Order Summary */}
      <div className="border p-4 rounded-lg bg-gray-50 mb-6">
        <h2 className="text-lg font-semibold mb-3">
          Order Summary
        </h2>

        <div className="flex justify-between">
          <span>Items</span>
          <span>3</span>
        </div>

        <div className="flex justify-between">
          <span>Total Price</span>
          <span className="font-semibold">₹1200</span>
        </div>
      </div>

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
      >
       <div className="border p-4 rounded mb-6">
  <h2 className="font-semibold mb-2">Shipping Address</h2>

{shippingData ? (
<> <p>{shippingData.name}</p> <p>{shippingData.email}</p> <p>{shippingData.phone}</p> <p>{shippingData.city}, {shippingData.state}</p> <p>PIN: {shippingData.pin}</p>
</>
) : ( <p>No shipping address found</p>
)}

</div>

        Pay Securely
      </button>

    </div>
  );
}