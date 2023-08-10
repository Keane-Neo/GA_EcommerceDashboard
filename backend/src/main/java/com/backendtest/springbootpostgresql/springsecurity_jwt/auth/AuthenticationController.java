package com.backendtest.springbootpostgresql.springsecurity_jwt.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> registerNewCustomer(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.registerNewCustomer(request));
    }

    @PostMapping("/admin/register")
    public ResponseEntity<AuthenticationResponse> registerNewAdmin(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.registerNewAdmin(request));
    }
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }
}

