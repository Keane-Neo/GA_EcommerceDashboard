package com.backendtest.springbootpostgresql.contoller;

import com.backendtest.springbootpostgresql.entity.Customer;
import com.backendtest.springbootpostgresql.entity.Order;
import com.backendtest.springbootpostgresql.exception.EmptyInputException;
import com.backendtest.springbootpostgresql.exception.OrderNotFoundException;
import com.backendtest.springbootpostgresql.exception.UserNotFoundException;
import com.backendtest.springbootpostgresql.repository.CustomerRepository;
import com.backendtest.springbootpostgresql.repository.OrderRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/admin")
public class AdminController {
    private CustomerRepository customerRepository;
    public OrderRepository orderRepository;

    @GetMapping("/customers")
    public List<Customer> retrieveAllCustomers() {
        return customerRepository.findAll();
    }

    @GetMapping("/orders")
    public List<Order> retrieveAllOrders() {
        return orderRepository.findAll();
    }

    @PostMapping("/customers")
    public Customer addNewCustomer(@Valid @RequestBody Customer customers, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new EmptyInputException();
        } else {
            return customerRepository.save(customers);
        }
    }

    // Needs to fix bug
    @DeleteMapping("/customers/{customerID}")
    public ResponseEntity<String> deleteCustomer(@PathVariable UUID customerID) {
        Customer customer = customerRepository.findById(customerID)
                .orElseThrow(UserNotFoundException::new);
        customerRepository.deleteById(customerID);
        return new ResponseEntity<>("Customer with customerID " + customerID + " deleted.",HttpStatusCode.valueOf(200));
    }

    @DeleteMapping("/orders/{orderID}")
    public ResponseEntity<String> deleteOrder(@PathVariable UUID orderID) {
        Order order = orderRepository.findById(orderID)
                .orElseThrow(OrderNotFoundException::new);
        orderRepository.deleteById(orderID);
        return new ResponseEntity<>("Order with orderID " + orderID + " deleted.",HttpStatusCode.valueOf(200));
    }

    @PutMapping("/customers/{customerID}")
    public ResponseEntity<?> updateOrder(@RequestBody Customer updatedCustomer, @PathVariable UUID customerID) {
        Customer currentCustomer = customerRepository.findById(customerID)
                .orElseThrow(UserNotFoundException::new);

        customerRepository.updateCurrentCustomer(updatedCustomer.getCustomerName(), updatedCustomer.getEmail(), updatedCustomer.getContactNum(), customerID);
        return ResponseEntity.ok("Customer updated");
    }
    
}
