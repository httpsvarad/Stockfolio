import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const StockChart = ({ companyName }) => {

    const apikey = import.meta.env.VITE_RAPID_API_KEY;
    const apihost = import.meta.env.VITE_RAPID_API_HOST;

    const [chartData, setChartData] = useState(null);

    const getChart = async () => {
        const options = {
            method: 'GET',
            url: 'https://indian-stock-exchange-api2.p.rapidapi.com/historical_data',
            params: {
                stock_name: companyName,
                period: '1m',
                filter: 'price',
            },
            headers: {
                'x-rapidapi-key': apikey,
                'x-rapidapi-host': apihost,
            },
        };

        try {
            const response = await axios.request(options);
            const data = response.data.datasets[0];
            const dates = data.values.map(item => item[0]);
            const prices = data.values.map(item => parseFloat(item[1]));

            setChartData({
                labels: dates,
                datasets: [
                    {
                        label: 'Price on NSE',
                        data: prices,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: true,
                        tension: 0.4,
                    },
                ],
            });
        } catch (error) {
            console.error('Error fetching chart data:', error);
            
        }
    };

    useEffect(() => {
        if (companyName) {
            getChart();
        }
    }, [companyName]);

   

    return (
        <div className="chart-container">
            {chartData ? (
                <Line data={chartData} />
            ) : (
                <p>Loading Chart...</p>
            )}
        </div>
    );
};

export default StockChart;
