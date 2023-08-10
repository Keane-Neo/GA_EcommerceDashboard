package com.backendtest.springbootpostgresql.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Data
@NoArgsConstructor(force = true)
@AllArgsConstructor
public class OrderNotFoundException extends RuntimeException {
    private final String message;
    private final String timeStamp;


}
