package com.example.stocktracker.controller;

import com.example.stocktracker.model.Stock;
import com.example.stocktracker.model.User;
import com.example.stocktracker.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stocks")
@CrossOrigin(origins = "https://stockfolio-ochre.vercel.app/", allowCredentials = "true")
public class StockController {
    @Autowired
    private StockService stockService;

    @GetMapping("/{userId}")
    public List<Stock> getStocks(@PathVariable Long userId) {
        User user = new User();
        user.setId(userId); // Minimal user object
        return stockService.getStocksByUser(user);
    }

    @PostMapping
    public Stock addStock(@RequestBody Stock stock) {
        return stockService.addStock(stock);
    }

    @PutMapping
    public Stock updateStock(@RequestBody Stock stock) {
        return stockService.updateStock(stock);
    }

    @DeleteMapping("/{stockId}")
    public void deleteStock(@PathVariable Long stockId) {
        stockService.deleteStock(stockId);
    }
}
