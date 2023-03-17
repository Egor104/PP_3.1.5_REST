package ru.kata.spring.boot_security.demo.services;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService {

    boolean saveUser(User user);
    void updateUser(User user);
    void deleteUserById(Long id);
    List<User> findAllUsers();
    List<User> usergtList(Long idMin);
}
