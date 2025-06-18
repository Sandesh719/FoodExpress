import {IMG_CDN_URL} from "../constants"

const RestaurantCard = (
    {name,cuisines,avgRating,cloudinaryImageId,totalRatingsString,sla,aggregatedDiscountInfoV3,areaName,costForTwo}
)=>{
    
    return (
    <div className="w-90 h-full rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-[0.94]">
        {/* Image with Discount Badge */}
        <div className="relative">
            <img
                className="w-full h-48 object-cover"
                src={IMG_CDN_URL + cloudinaryImageId}
                alt={name}
                loading="lazy"
            />
            {(aggregatedDiscountInfoV3?.header || aggregatedDiscountInfoV3?.subHeader) && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2 text-white">
                <span className="font-bold text-md truncate">
                    {aggregatedDiscountInfoV3?.header + " "}
                </span>
                <span className="text-md font-bold">
                    {aggregatedDiscountInfoV3?.subHeader}
                </span>
            </div>
            )}
        </div>

        {/* Restaurant Info */}
        <div className="p-4">
            <h3 className="font-semibold text-xl text-gray-800 truncate">{name}</h3>
        
        {/* Rating and Delivery Time */}
        <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-1">
                <div className="flex items-center bg-green-600 text-white px-1.5 py-0.5 rounded">
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mr-0.5"
                >
                    <path d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z" />
                </svg>
                <span className="text-sm font-medium">{avgRating}</span>
                </div>
                <span className="text-gray-600 font-medium">• {sla.slaString}</span>
            </div>
            
        </div>

        {/* Cuisines */}
        <p className="text-gray-600 text-sm mt-2 font-medium">{costForTwo}</p>
        <p className="text-gray-600 text-sm font-medium truncate">
            {cuisines.join(", ")}
        </p>
        <p className="text-gray-600 text-sm font-medium truncate">
            {areaName}
        </p>
        </div>
    </div>
    )
};

export default RestaurantCard;