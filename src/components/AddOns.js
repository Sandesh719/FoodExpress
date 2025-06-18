const AddOns = ({ showAddons, setShowAddons, items }) => {
    if (!showAddons || !items || items.length === 0) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Customize Your Order</h3>
                    <button 
                        onClick={() => setShowAddons(null)} 
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                {items.map((addonGroup) => (
                    <div key={addonGroup.groupId} className="mb-6">
                        <h4 className="font-bold text-lg mb-2">{addonGroup.groupName}</h4>
                        <p className="text-sm text-gray-500 mb-3">
                            {addonGroup.maxAddons > 0 
                                ? `Choose up to ${addonGroup.maxAddons}` 
                                : 'Optional additions'}
                        </p>
                        
                        <div className="space-y-3">
                            {addonGroup.choices.map((choice) => (
                                <label key={choice.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50">
                                    <input 
                                        type={addonGroup.maxAddons === 1 ? "radio" : "checkbox"}
                                        name={`addon-${addonGroup.groupId}`}
                                        className="mt-1"
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <span className="font-medium">{choice.name}</span>
                                            <span className="font-semibold">₹{(choice.price/100).toFixed(2)}</span>
                                        </div>
                                        {choice.isVeg !== undefined && (
                                            <div className={`w-4 h-4 border-2 mt-1 ${choice.isVeg ? "border-green-600" : "border-red-600"} flex items-center justify-center`}>
                                                <div className={`w-2 h-2 rounded-full ${choice.isVeg ? "bg-green-600" : "bg-red-600"}`} />
                                            </div>
                                        )}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}

                <button 
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-bold mt-4 hover:bg-green-700"
                    onClick={() => setShowAddons(null)}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default AddOns;