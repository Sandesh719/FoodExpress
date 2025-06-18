export function filterData(searchText,restaurants){
    if(searchText==="") return restaurants
    const filteredData = restaurants.filter((restaurant)=>
        restaurant?.info?.name?.toLowerCase()?.includes(searchText?.toLowerCase())
    )
    return filteredData
}

export const sortRestaurants = (restaurants, option) => {
  const sorted = [...restaurants];
  
  switch(option) {
    case 'rating':
      return sorted.sort((a, b) => 
        parseFloat(b?.info?.avgRating) - parseFloat(a?.info?.avgRating)
      );
      
    case 'delivery_time':
      return sorted.sort((a, b) => 
        a?.info?.sla?.deliveryTime - b?.info?.sla?.deliveryTime
      );
      
    case 'cost_low':
      return sorted.sort((a, b) => 
        (a?.info?.costForTwo.match(/\d+/)[0] || 0) - 
        (b?.info?.costForTwo.match(/\d+/)[0] || 0)
      );
      
    case 'cost_high':
      return sorted.sort((a, b) => 
        (b?.info?.costForTwo.match(/\d+/)[0] || 0) - 
        (a?.info?.costForTwo.match(/\d+/)[0] || 0)
      );
      
    default: // 'relevance'
      return sorted.sort((a, b) => 
        b?.info?.area?.localeCompare(a?.info?.area) // Example relevance sort
      );
  }
};


// Available sort options
export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'rating', label: 'Rating' },
  { value: 'delivery_time', label: 'Delivery Time' },
  { value: 'cost_low', label: 'Cost: Low to High' },
  { value: 'cost_high', label: 'Cost: High to Low' }
];