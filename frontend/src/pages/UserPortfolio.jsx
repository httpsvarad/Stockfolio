import React, { useEffect, useState } from 'react';
import useStore from '../store/useStore';
import userpng from '../assets/user.png';
import { Link, useNavigate } from 'react-router-dom';
import EditStockModal from '../components/EditStockModal';
import { toast } from 'react-toastify';

const UserPortfolio = () => {
    const { user, getUserStocks, stocks, isLoading, deleteStock, logout } = useStore();
    const [selectedStock, setSelectedStock] = useState(null);

    useEffect(() => {
        if (user?.id) {
            getUserStocks(user.id);
        }
    }, [getUserStocks, user?.id]);

    const calculateTotalValue = () => {
        return stocks.reduce((total, stock) => total + stock.quantity * stock.price, 0);
    };

    const navigate = useNavigate();

    const handleDeleteStock = async (stockId) => {
        await deleteStock(stockId);
        getUserStocks(user.id);
        toast.error("Stock Deleted", { position: "top-center"  })
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleEditStock = (stock) => {
        setSelectedStock(stock);
        document.getElementById('editStockModal').showModal();
    };

    const handleCloseModal = () => {
        setSelectedStock(null);
        document.getElementById('editStockModal').close();
    };

    return (
        <div>
            <div className="mr-3 ml-2 h-20 items-center flex">
                <div className="navbar bg-base-100">
                    <div className="flex-1">
                        <h1 className="text-xl font-semibold my-auto">📈</h1>
                        <span className="text-xl ml-2 font-semibold my-auto hidden md:block">Stockfolio</span>
                    </div>

                    <div className="gap-2">
                        <Link to="/search" className="my-auto">
                            <h3 className="my-auto bg-blue-500 rounded-lg p-2 text-white font-semibold">
                                Add Stocks
                            </h3>
                        </Link>
                        <h3 className="my-auto mr-2 bg-green-500 rounded-lg p-2 text-white font-semibold">
                            VAL ₹{calculateTotalValue().toFixed(2)}
                        </h3>
                    </div>

                    <div className="flex-none gap-3">
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-14 rounded-full">
                                    <img alt="Profile" src={userpng} />
                                </div>
                            </div>

                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                            >
                                <li onClick={handleLogout}>
                                    <a>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <hr />

            <div className="p-5 overflow-auto">
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-lg text-cyan-600 font-semibold">{user?.name}'s Portfolio</h1>
                    </div>
                </div>

                <div className="mt-5">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Stock Name</th>
                                <th>Quantity</th>
                                <th>Current Price</th>
                                <th>Total Value</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!isLoading && stocks.length > 0 ? (
                                stocks.map((stock) => (
                                    <tr key={stock.id}>
                                        <td>{stock.name}</td>
                                        <td>{stock.quantity}</td>
                                        <td>₹{stock.price.toFixed(2)}</td>
                                        <td>₹{(stock.quantity * stock.price).toFixed(2)}</td>
                                        <td>
                                            <div className='flex'>
                                            <button
                                                className="btn btn-error text-white btn-sm"
                                                onClick={() => handleDeleteStock(stock.id)}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className="btn btn-sm bg-amber-300 hover:bg-amber-400 ml-3"
                                                onClick={() => handleEditStock(stock)}
                                            >
                                                Edit
                                            </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        {isLoading ? 'Loading...' : 'No Stocks Available'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <dialog id="editStockModal" className="modal">
                <div className="modal-box">
                    <button onClick={handleCloseModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                    {selectedStock && (
                        <EditStockModal stock={selectedStock} onClose={handleCloseModal} />
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default UserPortfolio;
