package com.backendtest.springbootpostgresql.repository;

import com.backendtest.springbootpostgresql.entity.Order;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.ZonedDateTime;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {
    @Modifying
    @Transactional
    @Query(value = "INSERT into orders (order_id, customer_id, order_date, total_price, no_of_items) values (uuid_generate_v4(), ?1, ?2, ?3, ?4)", nativeQuery = true)
    public void addNewOrder(UUID customerID, ZonedDateTime orderDate, float totalPrice, int numOfItems);

    @Modifying
    @Transactional
    @Query(value = "UPDATE orders SET total_price = ?1, no_of_items = ?2 WHERE order_id = ?3", nativeQuery = true)
    public void updateCurrentOrder(float totalPrice, int numOfItems, UUID orderID);

}
