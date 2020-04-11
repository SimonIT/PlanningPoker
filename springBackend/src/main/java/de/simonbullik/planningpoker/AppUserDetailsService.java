package de.simonbullik.planningpoker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.naming.NamingException;


@Service
public class AppUserDetailsService implements UserDetailsService {


    private UserManager userService;

    @Autowired
    AppUserDetailsService(UserManager userService) {
        this.userService = userService;
    }

    /**
     * @param username the username of the user who wants to log in
     * @return user with details
     * @throws UsernameNotFoundException if the user is not found
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.getUserByUsername(username);
        if (user != null) {
            return user;
        } else {
            throw new UsernameNotFoundException("Couldn't find the username " + username + " at the ldap");
        }
    }
}
