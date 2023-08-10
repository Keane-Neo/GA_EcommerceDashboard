package com.backendtest.springbootpostgresql.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@NoArgsConstructor(force = true)
@AllArgsConstructor
public class UserNotFoundException extends RuntimeException {
    private final String message;
    private final String timeStamp;
    
}
