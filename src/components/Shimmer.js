const Shimmer = () => {
    return (
      <div className="max-w-10/12 mx-auto space-y-8 px-4">
        {/* Banner Shimmer */}
        <div className="mt-8">
          <div className="h-8 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
          <div className="flex space-x-4 overflow-hidden pb-4 mb-8 border-b-2 border-gray-100">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="shrink-0 w-36 h-48 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
  
        {/* Search Bar Shimmer */}
        <div className="flex items-center my-6">
          <div className="h-10 w-64 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="ml-2 h-10 w-20 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
  
        {/* Restaurant Grid Shimmer */}
        <div className="mt-10">
          <div className="h-8 w-80 bg-gray-200 rounded mb-6 animate-pulse"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-48 bg-gray-200 rounded-xl animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="flex space-x-2">
                  <div className="h-4 bg-gray-200 rounded w-10 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Shimmer;