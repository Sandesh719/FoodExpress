import { useCart } from "../context/CartContext.js";
import { IMG_CDN_URL } from "../constants.js";
import { Link } from "react-router";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
          <Link 
            to="/" 
            className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Browse Restaurants
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map(item => (
            <div key={item?.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center flex-1">
                <img 
                  src={IMG_CDN_URL + item?.imageId} 
                  className="w-20 h-20 object-cover rounded-lg"
                  alt={item?.name}
                  onError={(e) => e.target.src = '/placeholder-food.jpg'}
                  loading="lazy"
                />
                <div className="ml-6">
                  <h2 className="font-bold text-gray-800">{item?.restaurantName}</h2>
                  <h3 className="font-semibold text-gray-600">{item?.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{item?.description?.substring(0, 50)}...</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button 
                    onClick={() => updateQuantity(item?.id, item?.quantity - 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-gray-800">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item?.id, item?.quantity + 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                
                <p className="w-24 text-right font-medium">₹{(item?.price * item?.quantity).toFixed(2)}</p>
                
                <button 
                  onClick={() => removeFromCart(item?.id)}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
          
          <div className="border-t pt-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹{cart?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="font-medium">₹{cart?.length > 0 ? '40.00' : '0.00'}</span>
            </div>
            <div className="flex justify-between items-center text-xl font-bold border-t pt-4">
              <span>Total</span>
              <span>₹{(cart.reduce((sum, item) => sum + (item?.price * item?.quantity), 0) + (cart?.length > 0 ? 40 : 0)).toFixed(2)}</span>
            </div>
            
            <button className="w-full mt-8 bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors shadow-md">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;