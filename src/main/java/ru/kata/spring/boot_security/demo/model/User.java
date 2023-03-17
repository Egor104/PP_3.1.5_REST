package ru.kata.spring.boot_security.demo.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import javax.persistence.*;
import java.util.Collection;
import java.util.Set;

// «Пользователь» – это просто Object. В большинстве случаев он может быть приведен к классу UserDetails.

@Entity
@Table(name = "users")
public class User implements UserDetails {
// UserDetails предоставляет необходимую информацию для построения объекта Authentication
// из DAO объектов приложения или других источников данных системы безопасности.
// Authentication представляет пользователя (Principal) с точки зрения Spring Security.
// UserDetails можно представить, как адаптер между БД пользователей и
// тем что требуется Spring Security внутри SecurityContextHolder.

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    // Поле, находящееся под аннотацией Transient, не имеет отображения в БД.
    @Transient
    private String passwordConfirm;
    //FetchType.EAGER – «жадная» загрузка, т.е. список ролей загружается
    // вместе с пользователем сразу (не ждет пока к нему обратятся).
    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Role> roles;

    public User() {}

    public User(String username) {
        this.username = username;
    }

    public Long getId() { return id; }
    public Set<Role> getRoles() { return roles; }
    public String getPasswordConfirm() { return passwordConfirm; }

    public void setId(Long id) { this.id = id; }
    public void setUsername(String username) { this.username = username; }
    public void setRoles(Set<Role> roles) { this.roles = roles; }
    public void setPassword(String password) { this.password = password; }
    public void setPasswordConfirm(String passwordConfirm) { this.passwordConfirm = passwordConfirm; }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", roles=" + roles +
                '}';
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() { return getRoles(); }
    @Override
    public String getPassword() { return password; }
    @Override
    public String getUsername() { return username; }
    @Override
    public boolean isAccountNonExpired() { return true; }
    @Override
    public boolean isAccountNonLocked() { return true; }
    @Override
    public boolean isCredentialsNonExpired() { return true; }
    @Override
    public boolean isEnabled() { return true; }
}
