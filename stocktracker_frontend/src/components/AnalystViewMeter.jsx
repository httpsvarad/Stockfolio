import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

const AnalystViewMeter = ({ analystView }) => {
  // Filter and prepare the data for the bar chart
  const data = analystView
    .filter((item) => item.ratingName.toLowerCase() !== 'total') // Exclude 'Total'
    .map((item) => ({
      name: item.ratingName,
      analysts: parseInt(item.numberOfAnalystsLatest, 10),
      color: item.colorCode,
    }));

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <h2 className='mb-3 font-bold text-xl'>Analyst View</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="analysts" fill="#8884d8">
            {data.map((entry, index) => (
              <cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalystViewMeter;
