import { useState,useEffect } from "react";
import { SWIGGY_API } from "../src/constants";

export const useGetRestaurants = (offset) => {
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

    async function getrestaurants() {
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

                const data = await fetch("http://localhost:3001/api/restaurants", {
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

    return {
        searchText,setSearchText,
        filteredRestaurants,setFilteredRestaurants,
        allRestaurants,
        nextOffset,
        widgetOffset,
        loading,
        banners
    }
}