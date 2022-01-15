package de.jeropeter.socialsharingappserver.configuration.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

  private final AuthUserService authUserService;

  public SecurityConfiguration(AuthUserService authUserService) {
    this.authUserService = authUserService;
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.csrf().disable();
    http.headers().frameOptions().disable();


    http.httpBasic()
    .authenticationEntryPoint(new BasicAuthenticationEntryPoint());

    http.authorizeRequests()
        .antMatchers(HttpMethod.POST,"/api/login").authenticated()
        .antMatchers(HttpMethod.GET,"/api/users/**").authenticated()
        .antMatchers(HttpMethod.PUT,"/api/users/{id:[0-9]+}").authenticated()
        .and()
        .authorizeRequests()
        .anyRequest()
        .permitAll();

    http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
  }

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(authUserService)
        .passwordEncoder(passwordEncoder());
  }

  @Bean
  public PasswordEncoder passwordEncoder(){
    return new BCryptPasswordEncoder();
  }
}
