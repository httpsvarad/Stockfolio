import React from 'react'

const StockNews = ({ recentNews }) => {
    // console.log(recentNews)

    if (!Array.isArray(recentNews) || recentNews.length === 0) {
        return <p>No News Available.</p>;
    }

    return (
        <div>
            <div>
                <h2 className='text-xl pl-3 font-bold'>Recent News</h2>
                {recentNews.map((news, index) =>


                    <a key={index} target='blank' href={news.url}>
                        <div className='m-1 p-2 hover:bg-slate-200 rounded-xl'>
                            <p className='text-xs'>{news.date.replace(/\s*IST\s*$/, '')}</p>
                            <h2 className='font-medium text-blue-700'>{news.headline}</h2>
                            
                        </div>
                    </a>

                )}
            </div>
        </div>
    )
}

export default StockNews