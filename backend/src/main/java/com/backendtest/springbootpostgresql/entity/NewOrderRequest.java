package com.backendtest.springbootpostgresql.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewOrderRequest {
    private UUID customerID;
    private float totalPrice;
    private int numOfItems;
}
