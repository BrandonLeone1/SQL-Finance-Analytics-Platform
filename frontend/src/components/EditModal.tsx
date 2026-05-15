export function EditModal ({setEditedItem, setEditingFalse, updateFunction, item, editedItem}) {
    return (
        <>
            <label htmlFor="new-amount">New amount?
                    <input 
                    type="number"
                    id="new-amount"
                    value={editedItem.amount || editedItem.budget_limit}
                    onChange={(e) => setEditedItem(prev => ({
                        ...prev,
                        amount: e.target.value,
                        budget_limit: e.target.value
                    }))}
                    className="border border-slate-300 px-3 py-2 rounded-xl mt-2 w-full"
                    />
                    </label>
                    
                    <div className="flex justify-between gap-2">
                    <button onClick={() => setEditingFalse(false)} className="cursor-pointer after:w-0 hover:after:w-full after:h-0.5 after:block after:bg-indigo-400 w-fit mx-auto">Cancel</button>
                    <button onClick={() => updateFunction(item.id)} className="cursor-pointer after:w-0 hover:after:w-full after:h-0.5 after:block after:bg-indigo-400 w-fit mx-auto">Update</button>
                    </div>
        </>
    )
}