package ru.kata.spring.boot_security.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.model.Role;

// Репозитории нужны для упрощённой реализации запросов к БД (не нужно прописывать SQL запросы)
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}
