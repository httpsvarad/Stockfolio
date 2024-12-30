import React, { useState } from 'react'
import useStore from '../store/useStore';
import { toast } from 'react-toastify';
import { Loader } from 'lucide-react';

const EditStockModal = ({ stock }) => {

    const [newQuantity, setNewQuantity] = useState(stock.quantity);

    const { user, getUserStocks, isLoading, updateStock, message } = useStore();

    const handleUpdate = async (e) => {
        e.preventDefault()
        const id = stock.id;
        const quantity = newQuantity;
        const name = stock.name;
        const price = stock.price;
        await updateStock(id, quantity, name, price, user)
        getUserStocks(user.id)
        // toast.success("Stock Updated", { position: "top-center"  })
    }

    // console.log(stock)

    return (
        <div>
            <h3 className='text-xl font-bold mb-5'>Edit Stock</h3>

            <form onSubmit={handleUpdate} className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Stock Name:</label>
                    <p className="text-lg font-semibold text-gray-800">{stock.name}</p>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Current Price on NSE:</label>
                    <p className="text-lg font-semibold text-gray-800">₹{stock.price.toFixed(2)}</p>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="input">
                        Quantity:
                    </label>
                    <input
                        type="number"
                        id="input"
                        value={newQuantity}
                        onChange={(e) => setNewQuantity(e.target.value)}
                        className="input input-bordered w-full text-gray-800 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="1"
                        placeholder="Enter quantity"
                    />
                </div>

                <div className="flex gap-3">
                    <button type="submit"  className="btn btn-success text-white w-full">
                        {isLoading ? <Loader className='animate-spin mx-auto'/> : 'Update'}
                    </button>

                </div>
                <h2 className='text-green-500 text-lg font-semibold text-center'>{message}</h2>
            </form>



        </div>
    )
}

export default EditStockModal