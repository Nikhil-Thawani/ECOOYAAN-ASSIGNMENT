async function getCartData() {
  const res = await fetch("http://localhost:3000/api/cart", {
    cache: "no-store",
  });

  return res.json();
}

export default async function CartPage() {
  const data = await getCartData();

  const subtotal = data.cartItems.reduce(
    (sum: number, item: any) =>
      sum + item.product_price * item.quantity,
    0
  );

  const total = subtotal + data.shipping_fee;

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {data.cartItems.map((item: any) => (
        <div
          key={item.product_id}
          className="flex gap-4 mb-4 border p-3 rounded"
        >
          <img src={item.image} width="80" />
          <div>
            <h2>{item.product_name}</h2>
            <p>Price: ₹{item.product_price}</p>
            <p>Qty: {item.quantity}</p>
          </div>
        </div>
      ))}

      <div className="mt-6 border p-4 rounded">
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Fee: ₹{data.shipping_fee}</p>
        <p className="font-bold">Grand Total: ₹{total}</p>
      </div>

      <a
        href="/checkout"
        className="block mt-6 bg-green-600 text-white text-center py-2 rounded"
      >
        Proceed to Checkout
      </a>
    </div>
  );
}