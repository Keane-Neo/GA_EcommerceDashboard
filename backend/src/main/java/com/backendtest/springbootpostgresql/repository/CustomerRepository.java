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

    @Modifying
    @Transactional
    @Query(value = "UPDATE customers SET customer_name = ?1, email = ?2, contact_no = ?3  WHERE customer_id = ?4", nativeQuery = true)
    public void updateCurrentCustomer(String name, String email, String contactNum, UUID customerID);

    Optional<Customer> findByEmail(String email);
}
