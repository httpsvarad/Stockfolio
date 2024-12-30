package com.example.stocktracker.service;

import com.example.stocktracker.model.Stock;
import com.example.stocktracker.model.User;
import com.example.stocktracker.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockService {
    @Autowired
    private StockRepository stockRepository;

    public List<Stock> getStocksByUser(User user) {
        return stockRepository.findByUser(user);
    }

    public Stock addStock(Stock stock) {
        return stockRepository.save(stock);
    }

    public void deleteStock(Long stockId) {
        stockRepository.deleteById(stockId);
    }

    public Stock updateStock(Stock stock) {
        return stockRepository.save(stock);
    }
}
