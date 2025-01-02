import React, { useState } from 'react';
import axios from 'axios';
import StockNews from '../components/StockNews';
import KeyStats from '../components/KeyStats';
import StockChart from '../components/StockChart';
import AnalystViewMeter from '../components/AnalystViewMeter';
import Header from '../components/Header';
import { Loader, ShoppingCart } from 'lucide-react';
import useStore from '../store/useStore';
import { toast } from 'react-toastify';

const MyPortfolio = () => {

    const apikey = import.meta.env.VITE_RAPID_API_KEY;
    const apihost = import.meta.env.VITE_RAPID_API_HOST;

    const { user, addstock, isLoading } = useStore();

    const [searchQuery, setSearchQuery] = useState('');
    const [stockData, setStockData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const trimmedSearchQuery = searchQuery.trim();

        const options = {
            method: 'GET',
            url: 'https://indian-stock-exchange-api2.p.rapidapi.com/stock',
            params: { name: trimmedSearchQuery },
            headers: {
                'x-rapidapi-key': apikey,
                'x-rapidapi-host': apihost,
            },
        };

        if (trimmedSearchQuery === '') {
            setLoading(false);
            return;
        }

        try {
            const response = await axios.request(options);
            setStockData(response.data);
            // console.log(response.data);
        } catch (error) {
            setError('Failed to fetch stock data. Try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddStock = async (e) => {

        e.preventDefault();
        const price = stockData.currentPrice?.NSE;
        const name = stockData.companyProfile?.exchangeCodeNse;
        await addstock(user, name, quantity, price);

        toast.success("Added to Portfolio", { position: "top-center" })


    };

    let totalStockPrice = stockData?.currentPrice?.NSE * quantity;

    if (loading) {
        return (
            <div>
                <Header handleSearch={handleSearch} setSearchQuery={setSearchQuery} />
                <div className="mt-40 flex justify-center items-center">
                    <Loader className="animate-spin" size={32} />
                </div>
                <p className="text-center mt-2">Loading</p>
            </div>
        );
    }

    if (!stockData) {
        return (
            <div>
                <Header handleSearch={handleSearch} setSearchQuery={setSearchQuery} />
                <div className="mt-40 flex justify-center text-center">
                    <p>Search a stock and add to your portfolio (e.g. Tata Steel)</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header handleSearch={handleSearch} setSearchQuery={setSearchQuery} />
            <hr />
            <div className="flex mt-5 flex-col md:flex-row">
                {/* Left Section */}
                <div className="md:w-[50%] pl-5 pr-5 md:pr-0 pb-5">
                    {stockData.companyName && (
                        <div className="mb-3">
                            <h1 className="font-bold mb-1 text-3xl">{stockData.companyName}</h1>
                            <p className="font-normal">{stockData.companyProfile?.exchangeCodeNse} NSE</p>
                            <div className="flex gap-2">
                                <h2 className="text-2xl font-medium">INR {stockData.currentPrice?.NSE}</h2>
                                <h2 className="text-2xl text-red-500 font-medium">{stockData.percentChange} %</h2>
                            </div>
                           <div className='block md:hidden'>
                           <a href="#addstockform"><button className="btn mt-3 btn-sm"><ShoppingCart /> Add To Portfolio</button></a>
                           </div>
                        </div>
                    )}

                    <div className="mb-7">
                        {stockData.companyName ? (
                            <StockChart companyName={stockData.companyName} />
                        ) : (
                            <p>{loading ? 'Loading...' : error || 'No Chart Available'}</p>
                        )}
                    </div>

                    <div className='p-3 rounded-lg shadow-md md:shadow-none md:p-0'>
                        {stockData.keyMetrics ? (
                            <KeyStats keyMetrics={stockData.keyMetrics} />
                        ) : (
                            <p>{loading ? 'Loading...' : error || 'No Stats Available'}</p>
                        )}
                    </div>
                </div>

                {/* Right Section */}
                <div className="md:w-[50%] pr-5 pb-5">
                    {stockData.companyProfile && (
                        <p className="md:pl-3 pl-5 mb-5 font-semibold">
                            Domain: {stockData.companyProfile?.mgIndustry} / ISIN: {stockData.companyProfile?.isInId}
                        </p>
                    )}

                    <div className="mb-5 shadow-md md:ml-3 ml-5 rounded-lg p-3">
                        {stockData.recentNews ? (
                            <StockNews recentNews={stockData.recentNews.slice(0, 3)} />
                        ) : (
                            <p>{loading ? 'Loading...' : error || 'No News Available'}</p>
                        )}
                    </div>

                    <div className="ml-5 md:ml-3">
                        <div className="flex flex-col md:flex-row gap-5 justify-between">
                            <div className="shadow-lg w-full rounded-lg">
                                {stockData.analystView ? (
                                    <AnalystViewMeter analystView={stockData.analystView} />
                                ) : (
                                    <p className='p-3'>{loading ? 'Loading...' : error || 'No Analyst View Available'}</p>
                                )}
                            </div>

                            <div id='addstockform' className="shadow-lg rounded-lg p-5 mb-5 md:mb-0 bg-white">
                                {stockData && (
                                    <>
                                        <form onSubmit={handleAddStock}>

                                            <h2 className="text-xl font-bold mb-2">Track Stock</h2>
                                            <h3 className="text-lg md:text-sm text-gray-600 mb-4">{stockData.companyName}</h3>
                                            <h3 className="text-lg md:text-sm text-gray-600 mb-4">
                                                Current Price: <span className="font-semibold text-gray-800">INR {stockData.currentPrice?.NSE}</span>
                                            </h3>

                                            <div className="flex items-center space-x-4 mb-4">
                                                <label htmlFor="quantity" className="text-lg md:text-sm font-medium text-gray-800">Quantity:</label>
                                                <input
                                                    type="number"
                                                    id="quantity"
                                                    className="input input-bordered w-20"
                                                    value={quantity}
                                                    min={1}
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                />
                                            </div>

                                            <h3 className="text-lg md:text-sm text-gray-600 mb-4">
                                                Total: <span className="font-semibold text-gray-800">INR {totalStockPrice.toFixed(2)}</span>
                                            </h3>

                                            <button type='submit' className="btn btn-primary w-full">
                                                {isLoading ? <Loader className='animate-spin mx-auto' /> : 'Add to Portfolio'}
                                            </button>

                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPortfolio;
