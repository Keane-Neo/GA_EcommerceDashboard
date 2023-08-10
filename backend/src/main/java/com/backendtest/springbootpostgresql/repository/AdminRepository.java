package com.backendtest.springbootpostgresql.repository;

import com.backendtest.springbootpostgresql.entity.Admin;
import com.backendtest.springbootpostgresql.entity.Customer;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface AdminRepository extends JpaRepository<Admin, UUID> {

    @Modifying
    @Transactional
    @Query(value = "UPDATE admin SET password = ?2 WHERE admin_id = ?1", nativeQuery = true)
    public void changePassword(UUID adminID, String newPassword);

    Optional<Admin> findByEmail(String email);
}
