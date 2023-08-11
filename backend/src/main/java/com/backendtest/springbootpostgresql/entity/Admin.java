package com.backendtest.springbootpostgresql.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@Builder
@AllArgsConstructor
@Table(name = "admin")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "admin_id")
    private UUID adminID;

    @Column
    private String email;

    @Column
    private String password;


    @Enumerated(EnumType.STRING)
    private Role role;

}
