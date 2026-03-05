'use client';

import { useState, useEffect } from 'react';

interface CartItem {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity?: number;
  image: string;
}

interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
}

const Home = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shippingFee, setShippingFee] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [requestForm, setRequestForm] = useState({ name: '', price: '', description: '' });
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    country: 'India',
  });
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [couponCode, setCouponCode] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  useEffect(() => {
    fetch('/api/cart')
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data.cartItems);
        setShippingFee(data.shipping_fee);
      });
  }, []);

  const updateQuantity = (id: number, newQty: number) => {
    if (newQty <= 0) {
      removeItem(id);
      return;
    }
    setCartItems((items) =>
      items.map((item) =>
        item.product_id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.product_id !== id));
  };

  const addItem = (newItem: CartItem) => {
    setCartItems((items) => {
      const existing = items.find((item) => item.product_id === newItem.product_id);
      if (existing) {
        return items.map((item) =>
          item.product_id === newItem.product_id
            ? { ...item, quantity: (item.quantity as number) + 1 }
            : item
        );
      } else {
        return [...items, { ...newItem, quantity: 1 }];
      }
    });
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Request sent for: ${requestForm.name} at ₹${requestForm.price}`);
    setRequestForm({ name: '', price: '', description: '' });
    setIsModalOpen(false);
  };

  const handleCompleteOrder = () => {
    // Simulate order placement
    setOrderPlaced(true);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product_price * (item.quantity as number),
    0
  );
  const ecoOffset = 10; // Fixed for demo
  const total = subtotal + shippingFee + ecoOffset;

  // Additional products
  const additionalProducts = [
    {
      product_id: 103,
      product_name: 'Eco-Friendly Water Bottle',
      product_price: 599,
      image: 'https://via.placeholder.com/150/00ff00/ffffff?text=Water+Bottle',
    },
    {
      product_id: 104,
      product_name: 'Organic Cotton T-Shirt',
      product_price: 899,
      image: 'https://via.placeholder.com/150/ff0000/ffffff?text=Cotton+T-Shirt',
    },
    {
      product_id: 105,
      product_name: 'Biodegradable Phone Case',
      product_price: 349,
      image: 'https://via.placeholder.com/150/ffff00/000000?text=Phone+Case',
    },
  ];

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-green-600">EcoCart</h1>
              <span className="text-sm text-gray-500">Secure Checkout 🔒</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-800">Help</button>
              <div className="flex items-center space-x-1">
                <span className="text-gray-600">🛒</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                  {cartItems.reduce((sum, item) => sum + (item.quantity as number), 0)}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Success Page */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">
              Thank you for choosing sustainable products. Your order helps reduce environmental impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">📦 Order Details</h2>
              <p><strong>Order Number:</strong> #ECY-48291</p>
              <p><strong>Date:</strong> March 5, 2026</p>
              <p><strong>Payment Method:</strong> {paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod.toUpperCase()}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">🚚 Delivery Info</h2>
              <p><strong>Estimated Delivery:</strong> March 8 – March 10</p>
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span>Order Placed ✓</span>
                  <span>Packed</span>
                  <span>Shipped</span>
                  <span>Delivered</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full w-1/4"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg mt-8">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">🌍 Your Impact</h2>
            <p className="text-lg mb-2">You saved: <strong>2.3 kg CO₂</strong></p>
            <p className="text-gray-600">Equivalent to: Charging 280 smartphones.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h2 className="text-xl font-semibold mb-4">🛍 Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item.product_id} className="flex justify-between items-center mb-2">
                <span>{item.product_name} ×{item.quantity}</span>
                <span>₹{item.product_price * (item.quantity as number)}</span>
              </div>
            ))}
            <hr className="my-4" />
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">📧 A confirmation email has been sent to: {shippingInfo.email}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-green-600">EcoCart</h1>
            <span className="text-sm text-gray-500">Secure Checkout 🔒</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-800">Help</button>
            <div className="flex items-center space-x-1">
              <span className="text-gray-600">🛒</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                {cartItems.reduce((sum, item) => sum + (item.quantity as number), 0)}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-screen">
          {/* Left Side: Checkout Form */}
          <div className="lg:col-span-2 space-y-8 overflow-y-auto pr-4">
            {/* Shipping Information */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">📦 Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={shippingInfo.fullName}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={shippingInfo.email}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={shippingInfo.phone}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  placeholder="Address Line"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 md:col-span-2"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={shippingInfo.city}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={shippingInfo.state}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  placeholder="PIN Code"
                  value={shippingInfo.pinCode}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, pinCode: e.target.value })}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <select
                  value={shippingInfo.country}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option>India</option>
                  <option>USA</option>
                  <option>UK</option>
                </select>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">🚚 Delivery Method</h2>
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="delivery"
                    value="standard"
                    checked={deliveryMethod === 'standard'}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="text-green-600 focus:ring-green-500"
                  />
                  <span>Standard Delivery (3-5 days) — Free 🌱</span>
                </label>
                <p className="text-sm text-gray-600 ml-6">🌿 We optimize routes to reduce carbon emissions.</p>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="delivery"
                    value="express"
                    checked={deliveryMethod === 'express'}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="text-green-600 focus:ring-green-500"
                  />
                  <span>Express Delivery (1-2 days) — ₹99</span>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">💳 Payment Method</h2>
              <div className="flex space-x-2 mb-4">
                {['card', 'upi', 'wallet', 'cod'].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`px-4 py-2 rounded-lg border ${
                      paymentMethod === method
                        ? 'bg-green-600 text-white border-green-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    } transition-colors`}
                  >
                    {method === 'card' ? 'Credit/Debit Card' : method.toUpperCase()}
                  </button>
                ))}
              </div>
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Name on Card"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <div className="flex space-x-2 text-sm text-gray-600">
                    <span>Visa</span>
                    <span>Mastercard</span>
                    <span>RuPay</span>
                  </div>
                  <p className="text-sm text-gray-600">🔒 Your payment information is encrypted.</p>
                </div>
              )}
              {paymentMethod === 'upi' && (
                <div>
                  <input
                    type="text"
                    placeholder="Enter UPI ID"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              )}
              {paymentMethod === 'wallet' && (
                <div>
                  <p className="text-gray-600">Wallet payment options will be available soon.</p>
                </div>
              )}
              {paymentMethod === 'cod' && (
                <div>
                  <p className="text-gray-600">Pay cash on delivery.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Order Summary */}
          <div className="space-y-8 overflow-y-auto max-h-[calc(100vh-120px)] pb-8">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h2 className="text-xl font-semibold mb-4">🛒 Order Summary</h2>
              <div className="space-y-2 mb-4">
                {cartItems.map((item) => (
                  <div key={item.product_id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <img src={item.image} width="40" height="40" className="rounded" />
                      <span className="text-sm">{item.product_name} ×{item.quantity}</span>
                    </div>
                    <span className="text-sm">₹{item.product_price * (item.quantity as number)}</span>
                  </div>
                ))}
              </div>
              <hr className="my-4" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? 'Free' : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Eco Offset</span>
                  <span>₹{ecoOffset}</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="ENTER CODE"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                    APPLY
                  </button>
                </div>
              </div>
              <button
                onClick={handleCompleteOrder}
                className="w-full bg-green-600 text-white py-3 rounded-lg mt-4 hover:bg-green-700 transition-colors font-semibold"
              >
                🌿 Complete Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
