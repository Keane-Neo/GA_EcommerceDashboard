package com.backendtest.springbootpostgresql.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.time.ZonedDateTime;

@Data
@NoArgsConstructor(force = true)
@AllArgsConstructor
public class EmptyInputException extends RuntimeException {
    private final String message;
    private final String timeStamp;

}
