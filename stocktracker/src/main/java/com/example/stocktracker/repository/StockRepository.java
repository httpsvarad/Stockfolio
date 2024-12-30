package com.example.stocktracker.repository;

import com.example.stocktracker.model.Stock;
import com.example.stocktracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StockRepository extends JpaRepository<Stock, Long> {
    List<Stock> findByUser(User user);
}
