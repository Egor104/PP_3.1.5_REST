package ru.kata.spring.boot_security.demo.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Класс конфигурации WebMvcConfigurer на самом деле является методом конфигурации в Spring.
// Он использует форму JavaBean вместо традиционного файла конфигурации xml для настройки инфраструктуры.

@Configuration
public class MvcConfig implements WebMvcConfigurer {
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/user").setViewName("userInfo");
        registry.addViewController("/admin").setViewName("admin");
    }
    // Метод addViewControllers позволяет не создавать отдельные классы контроллеров.
}
