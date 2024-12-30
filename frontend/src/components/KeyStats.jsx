import React from 'react';

// function to format numbers
const formatNumber = (num) => {
  if (num === null || num === undefined || isNaN(num)) return '-';
  return parseFloat(num).toFixed(2);
};

const KeyStats = ({ keyMetrics }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">Key Stats</h2>
      <div className="pt-2">
        {/* First row */}
        <div className="flex mb-3 justify-between">
          <div className="w-40 font-semibold">
            <h2>Market Cap</h2>
            <h2>{formatNumber(keyMetrics.priceandVolume[0].value)}</h2>
          </div>

          <div className="w-40 font-semibold">
            <h2>PE Ratio (TTM)</h2>
            <h2>{formatNumber(keyMetrics.valuation[5].value)}</h2>
          </div>

          <div className="w-40 font-semibold">
            <h2>Revenue (TTM)</h2>
            <h2>{formatNumber(keyMetrics.incomeStatement[1].value)}</h2>
          </div>
        </div>

        {/* Second row */}
        <div className="flex justify-between">
          <div className="w-40 font-semibold">
            <h2>Net Income (TTM)</h2>
            <h2>{formatNumber(keyMetrics.incomeStatement[2].value)}</h2>
          </div>

          <div className="w-40 font-semibold">
            <h2>D/Share (FY)</h2>
            <h2>{formatNumber(keyMetrics.persharedata[15].value)}</h2>
          </div>

          <div className="w-40 font-semibold">
            <h2>Beta</h2>
            <h2>{formatNumber(keyMetrics.priceandVolume[20].value)}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyStats;
