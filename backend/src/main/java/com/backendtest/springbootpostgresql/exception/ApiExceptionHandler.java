package com.backendtest.springbootpostgresql.exception;

import org.springframework.beans.ConversionNotSupportedException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.Clock;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@ControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

    public String getCurrentTimeStamp() {
        ZonedDateTime zonedDateTime = ZonedDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return zonedDateTime.format(formatter);

    }
    @ExceptionHandler(EmptyInputException.class)
    public ResponseEntity<Object> handleEmptyInput (EmptyInputException e) {
        return new ResponseEntity<>(new EmptyInputException("Input Fields are empty", getCurrentTimeStamp()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Object> userNotFound (UserNotFoundException e) {
        return new ResponseEntity<>(new UserNotFoundException("User Not Found", getCurrentTimeStamp()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(OrderNotFoundException.class)
    public ResponseEntity<Object> orderNotFound (OrderNotFoundException e) {
        return new ResponseEntity<>(new OrderNotFoundException("Order Not foundd", getCurrentTimeStamp()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> generalException (Exception e) {
        return ResponseEntity.badRequest().body("Invalid Request");
    }
}
