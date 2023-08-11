package com.backendtest.springbootpostgresql.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@Builder
@AllArgsConstructor
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "customer_id")
    private UUID customerID;

    @Column(name = "customer_name")
    private String customerName;

    @Column
    private String email;

    @Column
    @JsonIgnore
    private String password;

    @Column(name = "contact_no")
    private String contactNum;

    @Column(name = "join_date")
    private String joinDate;

    @Column(name = "order_count")
    private Integer orderCount;

    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    private List<Order> orders;

    @Enumerated(EnumType.STRING)
    private Role role;
}
