package com.backendtest.springbootpostgresql.repository;

import com.backendtest.springbootpostgresql.entity.Customer;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface CustomerRepository extends JpaRepository<Customer, UUID> {

    @Modifying
    @Transactional
    @Query(value = "UPDATE customers SET password = ?2 WHERE customer_id = ?1", nativeQuery = true)
    public void changePassword(UUID customerID, String newPassword);

    Optional<Customer> findByEmail(String email);
}
