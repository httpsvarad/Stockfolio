import React from "react";
import TradingViewWidget from "../components/TradingViewWidget";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 text-gray-800 p-10">
            {/* Header Section */}
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold mb-6 leading-tight text-gray-800">
                    Take Control of Your Investments
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Track your stock portfolio with ease using real-time charts, key stats and analysis tools - all in one place.
                </p>
            </header>

            {/* Get Started Button */}
            <div className="mb-12">
                <a href="/search">
                <button
                    className="bg-blue-600 text-white py-3 px-10 rounded-full text-lg font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300 transform hover:scale-105"
                >
                    Get Started
                </button>
                </a>
            </div>

            {/* Trading Widget Section */}
            <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">
                    Real-Time Market Analysis
                </h2>
                <p className="text-gray-600 mb-6">
                    Explore detailed charts and stay informed about the latest market trends to make better investment decisions.
                </p>
                <div className="w-full h-96 rounded-lg overflow-hidden">
                    <TradingViewWidget />
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-12 text-center text-sm text-gray-500">
                Made with ❤️ by Varad Manegopale
            </footer>
        </div>
    );
};

export default Home;
