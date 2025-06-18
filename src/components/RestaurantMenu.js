import { useState } from "react";
import { Link, useParams } from "react-router";
import Shimmmer from "./Shimmer";
import { useRestaurant } from "../../utils/useRestaurant";
import { IMG_CDN_URL } from "../constants";
import { AiOutlineArrowLeft } from "react-icons/ai";
import RestaurantCategory from "./RestaurantCategory"
import { useCart } from "../context/CartContext";

const RestaurantMenu = ()=>{

    const {Resid} = useParams();
    const {addToCart} = useCart();
    const [addedItemId, setAddedItemId] = useState(null);
    const {restaurantMenu,restaurantInfo,menuCarousel} = useRestaurant(Resid)

    const handleAddToCart = (item,resInfo) => {
        // console.log(item);
        setAddedItemId(item?.dish?.info?.id);
        setTimeout(() => setAddedItemId(null), 1000);
        const object = {
            restaurantName: resInfo?.name,
            id: item?.dish?.info?.id,
            name: item?.dish?.info?.name,
            price: item?.dish?.info?.itemPriceStrikeOff===true ? item?.dish?.info?.finalPrice / 100 : item?.dish?.info?.price / 100,
            imageId: item?.dish?.info?.imageId,
            description: item?.dish?.info?.description
        } 
        // console.log(object)
        addToCart(object);
    };
    
    return (!restaurantMenu) ? (<Shimmmer/>) : (
    <div className="max-w-5xl mx-auto px-4 py-6">
        <Link to={"/"}><button className="bg-orange-500 text-white px-5 py-2 mb-2 rounded-lg font-medium hover:bg-orange-600 transition-colors cursor-pointer">
            <AiOutlineArrowLeft className="inline mr-1.5 text-xl"/>
            Back
            </button></Link>
        
        {/* Restaurant Header */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="md:w-2/3 lg:w-3/4">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{restaurantInfo?.name}</h1>
                
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded">
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="mr-1">
                            <path d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z" />
                        </svg>
                        <span className="text-sm font-medium">{restaurantInfo?.avgRatingString}</span>
                    </div>
                    <span className="text-gray-600 text-sm">({restaurantInfo?.totalRatingsString})</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600 text-sm">{restaurantInfo?.costForTwoMessage}</span>
                </div>

                <div className="text-gray-600 mb-4">
                    <p className="mb-1">{(restaurantInfo?.cuisines)?restaurantInfo?.cuisines.join(", "):null}</p>
                    <p className="mb-1">{restaurantInfo?.areaName}</p>
                    <p>{restaurantInfo?.sla?.minDeliveryTime}-{restaurantInfo?.sla?.maxDeliveryTime} mins delivery</p>
                </div>
            </div>
        </div>

        {/* Menu Carousel */}
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Top Picks</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar mb-8 border-b-2 border-gray-100">
                {menuCarousel?.map((item) => (
                <div key={item?.bannerId} className="shrink-0 w-96 h-98 relative">
                    <img
                        src={IMG_CDN_URL + item?.creativeId}
                        alt={item?.title}
                        className="w-full h-full object-cover rounded-lg transition-transform"
                    />
                    <div className="flex justify-between">
                        <div>
                    {item?.dish?.info?.price && (
                    <div className={`absolute bottom-3 left-2 text-white px-2 py-1 rounded-md text-lg font-semibold ${item?.dish?.info?.finalPrice ? 'bottom-9 decoration-solid decoration-white line-through decoration-2 opacity-90':''} z-10`}>
                        ₹{item?.dish?.info?.price / 100}
                    </div>
                    )}
                    {item?.dish?.info?.finalPrice && (
                    <div className="absolute bottom-3 left-2 text-white px-2 py-1 rounded-md text-lg font-semibold z-10">
                        ₹{item?.dish?.info?.finalPrice / 100}
                    </div>
                    )}
                    </div>
                        <div className="absolute bottom-3 right-2">
                        <button 
                            className="bg-white shadow-lg border-gray-300 border-2 text-green-600 px-8 py-2 font-semibold rounded-lg hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleAddToCart(item,restaurantInfo)}
                        >
                            {addedItemId === item?.dish?.info?.id ? 'ADDED ✓' : 'ADD'}
                        </button>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
        {/* Menu Sections */}
        <div >
            {restaurantMenu.map(
                (category) => (
                <RestaurantCategory key={category?.card?.card?.categoryId} data={category?.card?.card} resInfo={restaurantInfo}/>
            ))}
        </div>
    </div>
    )
}

export default RestaurantMenu;