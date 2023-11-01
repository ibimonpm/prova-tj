package com.tj.rj.livro.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.tj.rj.livro.service.DBservice;

/**
 * ibimon.morais
 */
@Configuration
@Profile("dev")
public class DevConfig {
	@Autowired
	DBservice bservice;

	@Value("${spring.jpa.hibernate.ddl-auto}")
	private String strategy;

    @Bean
    boolean instanciaBaseDeDados() {
        if (this.strategy.equals("create")) {
            this.bservice.instanciaBaseDeDados();
        }
        return false;
    }
    
}
