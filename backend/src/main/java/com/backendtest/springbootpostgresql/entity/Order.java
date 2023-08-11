package com.backendtest.springbootpostgresql.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.UUID;
@Data
@NoArgsConstructor
@Entity
@AllArgsConstructor
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue
    @Column(name = "order_id")
    private UUID orderID;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @Column(name = "order_date")
    private ZonedDateTime orderDate;

    @Column(name = "total_price")
    private float totalPrice;

    @Column(name = "no_of_items")
    private int numOfItems;
//
//    @Column(name = "customer_id")
//    private UUID customerID;

    public Order(Customer customer, ZonedDateTime orderDate, float totalPrice, int numOfItems) {
        this.customer = customer;
        this.orderDate = orderDate;
        this.totalPrice = totalPrice;
        this.numOfItems = numOfItems;
//        this.customerID = customerID;
    }
}
