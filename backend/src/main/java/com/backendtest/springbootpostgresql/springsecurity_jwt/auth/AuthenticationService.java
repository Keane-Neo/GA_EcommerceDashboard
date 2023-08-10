package com.backendtest.springbootpostgresql.springsecurity_jwt.auth;

import com.backendtest.springbootpostgresql.entity.Admin;
import com.backendtest.springbootpostgresql.entity.Customer;
import com.backendtest.springbootpostgresql.entity.Role;
import com.backendtest.springbootpostgresql.repository.AdminRepository;
import com.backendtest.springbootpostgresql.repository.CustomerRepository;
import com.backendtest.springbootpostgresql.springsecurity_jwt.config.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final CustomerRepository customerRepository;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse registerNewCustomer(RegisterRequest request) {
        var user = Customer.builder()
                .customerID(UUID.randomUUID())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_USER)
                .build();
        customerRepository.save(user);
//        Map<String, Object> claims = new HashMap<>();
//        claims.put("roles", "USER");
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse registerNewAdmin(RegisterRequest request) {
        var user = Admin.builder()
                .adminID(UUID.randomUUID())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_ADMIN)
                .build();
        adminRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var customer = adminRepository.findByEmail(request.getEmail())
                .orElseThrow();
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        var jwtToken = jwtService.generateToken(customer);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
