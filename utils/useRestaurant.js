import { useState,useEffect } from "react";
import { RESTAURANTS_MENU_URL1, RESTAURANTS_MENU_URL2} from "../src/constants";

export const useRestaurant = (resId) => {
    const [restaurantInfo,setRestaurantInfo] = useState([])
    const [restaurantMenu,setRestaurantMenu] = useState([])
    const [menuCarousel,setMenuCarousel] = useState([])
    

    useEffect(()=>{
        getRestuarantInfo();
    },[])

    async function getRestuarantInfo() {
        const data = await fetch(RESTAURANTS_MENU_URL1 + resId + RESTAURANTS_MENU_URL2, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Accept-Language': 'en-US',
                    'Referer': 'https://www.swiggy.com/',
                },
                credentials: 'include'
            });
        const json = await data.json();

        // console.log(json.data.cards[2].card.card.info)
        setRestaurantInfo(json?.data?.cards[2]?.card?.card?.info)

        const regularCards = json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
        setMenuCarousel(json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.carousel);

        const categories = regularCards.filter(
            (c) => {
                const type = c.card?.card?.["@type"];
                return type === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" || 
                    type === "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory";
            }
        );
        // console.log(categories);
        setRestaurantMenu(categories);

    }
    return {restaurantMenu,restaurantInfo,menuCarousel}
}