import { useState } from "react";
import { IMG_CDN_URL } from "../constants.js";
import { useCart } from "../context/CartContext.js";
import AddOns from "./AddOns.js";

const ItemsList = ({items,resInfo}) => {
    // console.log(items)
    // console.log(resInfo)
    const [addedItemId, setAddedItemId] = useState(null);
    const [showAddons, setShowAddons] = useState(null);

    const {addToCart}  = useCart(); // Get the addToCart function from context

    const handleAddToCart = (item,resInfo) => {
        // console.log(item);
        setAddedItemId(item?.card?.info?.id);
        setTimeout(() => setAddedItemId(null), 1000);
        const object = {
            restaurantName: resInfo?.name,
            id: item?.card?.info?.id,
            name: item?.card?.info?.name,
            price: item?.card?.info.price? item?.card?.info?.price / 100 : item?.card?.info?.defaultPrice / 100,
            imageId: item?.card?.info?.imageId,
            description: item?.card?.info?.description
        } 
            // console.log(object)
        addToCart(object);
    };

    return (
        <div>
            {items?.map((item) => (
                <div
                key={item?.card?.info?.id}
                className="m-2 p-2 pb-3 border-b-2 border-gray-200 flex justify-between cursor-pointer hover:bg-gray-100"
                >
                    {/* Content div */}
                    <div className="w-9/12">
                    <div className="py-2">
                        {/* dietry badge */}
                        <div>
                        {item?.card?.info?.itemAttribute?.vegClassifier && (
                                    <div className={`w-5 h-5 border-2 ${item?.card?.info?.itemAttribute?.vegClassifier === "VEG" ? "border-green-600" : "border-red-600"} flex items-center justify-center`}>
                                        <div className={`w-3 h-3 rounded-full ${item?.card?.info?.itemAttribute?.vegClassifier === "VEG" ? "bg-green-600" : "bg-red-600"}`} />
                                    </div>
                                )}
                        </div>
                        <div className="font-bold text-lg my-2">{item?.card?.info?.name}</div>
                        <div className="font-bold text-base my-2">₹{item?.card?.info?.price?item?.card?.info?.price/100:item?.card?.info?.defaultPrice/100}</div>
                        {item?.card?.info?.ratings?.aggregatedRating?.rating && <>
                        <div className="inline-block">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" fillcolor="#116649"><rect width="14" height="14" fill="white"></rect><path d="M5.67163 3.99166C6.22068 2.34179 6.49521 1.51686 7 1.51686C7.50479 1.51686 7.77932 2.34179 8.32837 3.99166L8.65248 4.96556H9.60668C11.4122 4.96556 12.315 4.96556 12.4703 5.45302C12.6256 5.94049 11.8893 6.4628 10.4167 7.50744L9.67376 8.03444L9.97544 8.94095C10.5325 10.615 10.8111 11.452 10.4033 11.754C9.99553 12.056 9.27604 11.5457 7.83705 10.5249L7 9.93112L6.16295 10.5249C4.72396 11.5457 4.00447 12.056 3.5967 11.754C3.18893 11.452 3.46747 10.615 4.02456 8.94095L4.04557 8.87783C4.18081 8.47145 4.24843 8.26825 4.18684 8.08006C4.12525 7.89187 3.94958 7.76725 3.59824 7.51802C2.11566 6.46633 1.37437 5.94049 1.52971 5.45302C1.68504 4.96556 2.5878 4.96556 4.39332 4.96556H5.34752L5.67163 3.99166Z" fill="#116649"></path></svg>
                        </div>
                        <div className="inline-block mx-1 text-green-800 font-bold text-sm">{item?.card?.info?.ratings?.aggregatedRating?.rating}</div>
                        <div className="inline-block text-sm">({item?.card?.info?.ratings?.aggregatedRating?.ratingCountV2})</div>
                        </>}
                    </div>
                    <p className="text-gray-600 text-sm mt-2">{item?.card?.info?.description}</p>
                    </div>
                    {/* Image div */}
                    <div className="h-40 relative">
                        <img 
                        src={IMG_CDN_URL + item?.card?.info?.imageId} alt={"image unavailable"} 
                        className="w-39 h-36 object-cover"
                        loading="lazy"
                        />
                        <div className="absolute -translate-y-4 translate-x-6">
                        <button
                        onClick={()=>handleAddToCart(item,resInfo)}
                        className="bg-white shadow-lg border-gray-300 border-2 text-green-600 px-8 py-2 font-semibold rounded-lg hover:bg-gray-200 
                        cursor-pointer ${addedItemId === item?.card?.info?.id ? 'ring-2 ring-green-500' : '' }"
                        >
                            {addedItemId === item?.card?.info?.id ? 'ADDED ✓' : 'ADD'}
                        </button>
                        {item?.card?.info?.addons?.length > 0 && (
                            <button
                                onClick={() => setShowAddons(item?.card?.info?.id)}
                                className="bg-white shadow-lg border-gray-300 border-2 text-green-600 px-2 py-1 text-sm font-semibold translate-x-1.5 rounded-lg hover:bg-gray-200 cursor-pointer"
                            >
                                Add-Ons +
                            </button>
                        )}
                        </div>
                    </div>
                </div>
            ))}
            <AddOns 
            showAddons={showAddons} 
            setShowAddons={setShowAddons} 
            items={items.find(item => item?.card?.info?.id === showAddons)?.card?.info?.addons || []}
            />

        </div>
    )
}

export default ItemsList;