package com.backendtest.springbootpostgresql.contoller;

import com.backendtest.springbootpostgresql.entity.ChangePasswordRequest;
import com.backendtest.springbootpostgresql.entity.Customer;
import com.backendtest.springbootpostgresql.entity.NewOrderRequest;
import com.backendtest.springbootpostgresql.entity.Order;
import com.backendtest.springbootpostgresql.exception.OrderNotFoundException;
import com.backendtest.springbootpostgresql.exception.UserNotFoundException;
import com.backendtest.springbootpostgresql.repository.CustomerRepository;
import com.backendtest.springbootpostgresql.repository.OrderRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/customer")
public class CustomerController {
    private CustomerRepository customerRepository;
    public OrderRepository orderRepository;

    @PutMapping("/change-password/{customerID}")
    public ResponseEntity<?> changePassword(@PathVariable UUID customerID, @RequestBody ChangePasswordRequest changePasswordRequest) {
        Customer customer = customerRepository.findById(customerID)
                .orElseThrow(UserNotFoundException::new);
        customerRepository.changePassword(customerID, changePasswordRequest.getNewPassword());
        return ResponseEntity.ok("Password updated");
    }


    @GetMapping("/orders/{customerID}")
    public List<Order> retrieveOrdersForCustomer(@PathVariable UUID customerID) {
        Customer customer = customerRepository.findById(customerID)
                .orElseThrow(UserNotFoundException::new);

            return customer.getOrders();
    }

    @PutMapping("/orders/{orderID}")
    public ResponseEntity<?> updateOrder(@RequestBody Order updatedOrder, @PathVariable UUID orderID) {
        Order currentOrder = orderRepository.findById(orderID)
                .orElseThrow(OrderNotFoundException::new);

        orderRepository.updateCurrentOrder(updatedOrder.getTotalPrice(), updatedOrder.getNumOfItems(), orderID);
        return ResponseEntity.ok("Order updated");
    }

    @PostMapping("/orders")
    public ResponseEntity<?> addNewOrder(@Valid @RequestBody NewOrderRequest newOrderRequest) {
        Customer customer = customerRepository.findById(newOrderRequest.getCustomerID())
                .orElseThrow(UserNotFoundException::new);
        orderRepository.addNewOrder(newOrderRequest.getCustomerID(), ZonedDateTime.now(), newOrderRequest.getTotalPrice(), newOrderRequest.getNumOfItems());


        return new ResponseEntity<>(customer.getOrders(), HttpStatus.CREATED);
    }
}
