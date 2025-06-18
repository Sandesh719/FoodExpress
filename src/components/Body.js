import { useState,useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import CardShimmer from "./CardShimmer";
import { Link } from "react-router";
import {filterData} from "../../utils/helper.js"
import useOnline  from "../../utils/useOnline.js";
import { IMG_CDN_URL,SWIGGY_API } from "../constants";
import { useGetRestaurants } from "../../utils/useGetRestaurants.js";
import { sortRestaurants,SORT_OPTIONS } from "../../utils/helper.js";

const Body = ()=>{

    const [sortOption, setSortOption] = useState('relevance');

    const [searchText,setSearchText] = useState("");
    const [filteredRestaurants,setFilteredRestaurants] = useState([]);
    const [allRestaurants,setAllRestaurants] = useState([]);
    const [nextOffset,setNextOffset] = useState("");
    const [widgetOffset,SetWidgetOffset] = useState({});
    const [loading, setLoading] = useState(false);
    const [banners,setBanners] = useState();

    useEffect(()=>{
        getrestaurants();
    },[])

    async function getrestaurants(offset="") {
        // const lat = "19.07480";
        // const lng = "72.88560";
        const seoParams = {
            seoUrl: "https://www.swiggy.com/restaurants",
            pageType: "FOOD_HOMEPAGE",
            apiName: "FoodHomePage",
            businessLine: "FOOD"
        };
        let csrfToken;
        try{
            if(!offset){
                setLoading(true)
                const data = await fetch(SWIGGY_API);
                const json = await data.json();
                console.log("Initial GET:", SWIGGY_API);
                // console.log(json);
                const bannersObj = json?.data?.cards[0]?.card?.card?.imageGridCards?.info;
                setBanners(bannersObj);
                csrfToken = json?.csrfToken;
                setNextOffset(json?.data?.pageOffset?.nextOffset);
                SetWidgetOffset(json?.data?.pageOffset?.widgetOffset);

                const finalData = json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
                setAllRestaurants(finalData);
                setFilteredRestaurants(finalData);
                // console.log(nextOffset)
            }
            else{
                setLoading(true)
                const url = "https://www.swiggy.com/dapi/restaurants/list/update";
                console.log("Fetching more with POST:", url);

                const body =  JSON.stringify({
                    csrfToken: csrfToken,
                    deviceId: "xyz456a346f11b-b52b-8ce6-cd28-772e997fa35a",
                    lat: "19.07480",
                    lng: "72.88560",
                    nextOffset: nextOffset,
                    widgetOffset: widgetOffset,
                    seoParams: seoParams,
                    page_type: "DESKTOP_WEB_LISTING",
                    _csrf: csrfToken
                    })

                const data = await fetch("http://localhost:30001/api/restaurants", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: body,
                    });
                const json = await data.json();

                setNextOffset(json?.data?.pageOffset?.nextOffset);
                SetWidgetOffset(json?.data?.pageOffset?.widgetOffset);

                const finalData = json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
                console.log(finalData)
                setAllRestaurants((prev) => [...prev, ...finalData]);
                setFilteredRestaurants((prev) => [...prev, ...finalData]);
            }
        }catch (error) {
            console.log("Failed to fetch restaurants: ",error)
        }
        setLoading(false)
    };

    // const {
    //     searchText,setSearchText,
    //     filteredRestaurants,setFilteredRestaurants,
    //     allRestaurants,
    //     nextOffset,
    //     loading,
    //     banners
    // } = useGetRestaurants();

    useEffect(() => {
    if (allRestaurants?.length) {
        const filtered = filterData(searchText, allRestaurants);
        const sorted = sortRestaurants(filtered, sortOption);
        setFilteredRestaurants(sorted);
    }
}, [allRestaurants, searchText, sortOption]);

    const isOnline = useOnline();
    if(!isOnline){
        return <h1>Oops!!Please check your internet connection...</h1>
    }
    

    return (allRestaurants?.length===0)?<Shimmer/>: (
    <div className="max-w-10/12 mx-auto space-y-8 px-4">
        {/* Banner Section */}
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">What's On Your Mind?</h2>
            <div className="relative">
                <div className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar mb-8 border-b-2 border-gray-100">
                    {banners?.map((item) => (
                        <div key={item?.id} className="shrink-0 w-36 h-48">
                            <img
                                src={IMG_CDN_URL + item?.imageId}
                                alt={item?.accessibility?.altText}
                                className="w-full h-full object-cover rounded-lg hover:scale-95 transition-transform"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
        {/* Search Section */}
        <div className="flex items-center my-6">
            <input 
                className="py-2 px-3 border-2 border-gray-300 rounded-md w-64"
                type="text" 
                placeholder="Search..." 
                value={searchText}
                onChange={(e) => {
                setSearchText(e.target.value);
                }}
            />
            <button className="ml-2 py-2 px-4 border-2 border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors">
                Search
            </button>
        </div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
                {filteredRestaurants?.length} Restaurants
            </h2>

            <div className="flex items-center">
                <span className="mr-2 text-gray-600">Sort by:</span>
                <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                {SORT_OPTIONS.map(option => (
                    <option key={option?.value} value={option?.value}>
                        {option?.label}
                    </option>
                ))}
                </select>
            </div>
        </div>
        {/* Restaurants Grid */}
        <div className="mt-10">
            {filteredRestaurants?.length === 0 ? (
                <h2 className="text-center text-xl font-medium text-gray-600 py-10">
                    No Restaurants Found!
                </h2>
            ) : (
            <div>
                <h2 className="font-extrabold my-6 text-2xl">Resaurants with online food delivery in Mumbai</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {filteredRestaurants?.map((restaurant) => (
                        <Link 
                            to={"/restaurant/" + restaurant?.info?.id}
                            key={restaurant?.info?.id}
                            className="hover:scale-[1.02] transition-transform"
                        >
                            <RestaurantCard {...restaurant?.info} />
                        </Link>
                    ))}
                </div>
            </div>
            )}
        </div>
        {/* Load More Button */}
        {nextOffset && (
            <div className="flex justify-center my-10">
                <button 
                    onClick={() => getrestaurants(nextOffset)} 
                    disabled={loading}
                    className="bg-orange-500 text-white px-5 py-2 mb-2 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                >
                    {loading ? "Loading..." : "Load More"}
                </button>
            </div>
        )}

        {/* Loading Shimmer */}
        {loading && <CardShimmer/>}
    </div>
    )
}

export default Body;