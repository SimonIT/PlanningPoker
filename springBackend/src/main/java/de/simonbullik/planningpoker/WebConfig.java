package de.simonbullik.planningpoker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.net.Inet4Address;
import java.net.Inet6Address;
import java.net.InetAddress;
import java.net.UnknownHostException;

@Configurable
@EnableWebSecurity
public class WebConfig extends WebSecurityConfigurerAdapter {

    private AppUserDetailsService appUserDetailsService;

    private CustomAuthenticationProvider authProvider;

    @Autowired
    WebConfig(AppUserDetailsService appUserDetailsService, CustomAuthenticationProvider authProvider) {
        this.appUserDetailsService = appUserDetailsService;
        this.authProvider = authProvider;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authProvider);
        auth.userDetailsService(appUserDetailsService).passwordEncoder(NoOpPasswordEncoder.getInstance());
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new MvcConfig();
    }

    class MvcConfig implements WebMvcConfigurer {
        /**
         * tried to allow for all rest repositories cors, seem not to work
         *
         * @param registry cors
         */
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            try {
                registry.addMapping("/**").allowedOrigins("http://localhost:4200",
                        "http://" + Inet4Address.getLocalHost().getHostAddress() + ":4200",
                        "http://[" + Inet6Address.getLocalHost().getHostAddress() + "]:4200",
                        "http://" + InetAddress.getLocalHost().getHostName() + ":4200");
            } catch (UnknownHostException e) {
                registry.addMapping("/**").allowedOrigins("http://localhost:4200");
            }
        }
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        super.configure(web);
    }

    /**
     * For Spring security, to enable/disbale login, setting the pages which are allowed to access or not
     * @param http
     * @throws Exception
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and()
                .authorizeRequests()
                .antMatchers("/account/login", "/logout").permitAll()
                //.anyRequest().fullyAuthenticated().and()
                .anyRequest().permitAll().and() //To allow access without login
                .logout()
                .permitAll()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout", "POST"))
                .and()
                .httpBasic().and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED).and()
                .csrf().disable();
    }

}
