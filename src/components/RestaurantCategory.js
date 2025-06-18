import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ItemsList from "./ItemList.js";

const RestaurantCategory = ({data,resInfo}) => {
    // console.log(data)
    // console.log(resInfo)
    const [showItems,setShowItems] = useState(true);
    const [showCategory,setShowCategory] = useState(true);

    function handleClick() {
        setShowItems(!showItems);
    }

    function handleClick1(){
        setShowCategory(!showCategory);
    }

    return (
    <div className="">
        {/* accordian header */}
        <div className="my-4 p-4 pl-0 border-b-14 border-gray-100">
            <div 
            className="flex justify-between cursor-pointer"
            onClick={handleClick}
            >
            <span className="font-bold text-lg">{data?.title} ({(data?.itemCards)?data?.itemCards?.length : data?.categories?.length})</span>
            <span>{(showItems)? <IoIosArrowUp className="font-bold text-2xl"/>:<IoIosArrowDown className="font-bold text-2xl"/>}</span>
            </div>
            {/* accordian body */}
                {
                (data?.itemCards)?
                (showItems && <ItemsList resInfo={resInfo} items={data?.itemCards}/>):
                <div>
                    {data?.categories.map((category) => (
                    showItems && <div key={category?.categoryId} className="my-4 py-3">
                        <div 
                        className="flex justify-between cursor-pointer"
                        onClick={handleClick1}
                        >
                            <span className="font-semibold text-base">{category?.title} ({category?.itemCards?.length})</span>
                            <span>{showCategory?<IoIosArrowUp className="font-bold text-2xl"/>:<IoIosArrowDown className="font-bold text-2xl"/>}</span>
                        </div>
                        {showCategory && <ItemsList items={category?.itemCards} resInfo={resInfo}/>}
                    </div>
                    ))}
                </div>
                }
            </div>
    </div>
    )
}

export default RestaurantCategory;