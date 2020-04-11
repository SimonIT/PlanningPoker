package de.simonbullik.planningpoker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import javax.naming.NamingException;
import java.util.ArrayList;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    private UserManager userManager;
    private LdapManager ldapManager;

    @Autowired
    CustomAuthenticationProvider(UserManager userManager, LdapManager ldapManager) {
        this.userManager = userManager;
        this.ldapManager = ldapManager;
    }

    /**
     * @param authentication
     * @return
     * @throws AuthenticationException
     */
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        try {
            User user = userManager.getUserByUsername(authentication.getName());
            user.setPassword(authentication.getCredentials().toString());

            if (ldapManager.checkCredentials(user)) {

                // use the credentials
                // and authenticate against the third-party system
                return new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword(), new ArrayList<>());
            }

        } catch (AuthenticationException e) {
            throw new BadCredentialsException(e.getLocalizedMessage());
        } catch (NamingException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}