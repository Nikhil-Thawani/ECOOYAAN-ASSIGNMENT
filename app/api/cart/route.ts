export async function GET() {
  const data = {
    cartItems: [
      {
        product_id: 101,
        product_name: "Bamboo Toothbrush (Pack of 4)",
        product_price: 299,
        quantity: 2,
        image: "https://via.placeholder.com/150/00ff00/ffffff?text=Bamboo+Toothbrush",
      },
      {
        product_id: 102,
        product_name: "Reusable Cotton Produce Bags",
        product_price: 450,
        quantity: 1,
        image: "https://via.placeholder.com/150/0000ff/ffffff?text=Cotton+Bags",
      },
    ],
    shipping_fee: 500,
    discount_applied: 0,
  };

  return Response.json(data);
}