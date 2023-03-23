package ru.kata.spring.boot_security.demo.services;

import ru.kata.spring.boot_security.demo.model.Role;

import java.util.List;

public interface RoleService {
    Role findRoleOfId(Long id);
    List<Role> getAllRoles();
    List<Role> getUniqAllRoles();
    void addRole(Role role);
}
