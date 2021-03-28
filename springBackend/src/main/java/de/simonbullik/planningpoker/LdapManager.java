package de.simonbullik.planningpoker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.ldap.AuthenticationException;
import org.springframework.ldap.core.support.LdapContextSource;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.DirContext;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;
import java.util.*;

@Service
public class LdapManager {
    private static final String group = "OU=NEUSTA";
    //TODO put into configuration file
    private static String defaultUser = "CN=admin,OU=User,DC=intern,DC=neusta,DC=de"; // Fill in the distinguished name for a default user to fetch all data
    private static String defaultPassword = "Praktikum2018"; // Fill in the password for the corresponding user

    private LdapContextSource contextSource;
    private SearchControls searchControls;

    private DirContext context;

    @Autowired
    LdapManager(LdapContextSource contextSource) {
        this.contextSource = contextSource;
        this.searchControls = new SearchControls();
        this.searchControls.setSearchScope(SearchControls.SUBTREE_SCOPE);
    }

    /**
     * refreshs the context to avoid a connection reset
     *
     * @throws NamingException
     */
    private void refreshContext() throws NamingException {
        this.context = this.contextSource.getContext(defaultUser, defaultPassword);
        this.context.addToEnvironment("java.naming.ldap.attributes.binary", "objectGUID"); // to get the objectGUID as binary array to form the guid
    }

    /**
     * @param sAMAccountName Windows logon name
     * @return the user from ldap, only if it is not deactivated and got an email
     * @throws NamingException
     */
    @Cacheable("user")
    public User getUser(@RequestParam String sAMAccountName) throws NamingException {
        refreshContext();
        String searchFilter = String.format("(&(sAMAccountType=805306368)(!(userAccountControl:1.2.840.113556.1.4.803:=2))(sAMAccountName=%s)(mail=*))", sAMAccountName);
        NamingEnumeration<SearchResult> results = this.context.search(group, searchFilter, this.searchControls);

        User user = null;
        if (results.hasMore()) {
            user = User.userFromAttributes(results.next().getAttributes());
        }
        this.context.close();
        return user;
    }

    /**
     * @return all users from ldap, only if they are not deactivated and got an email
     * @throws NamingException
     */
    @Cacheable("users")
    public List<User> getAllUser() throws NamingException {
        refreshContext();
        String searchFilter = "(&(sAMAccountType=805306368)(!(userAccountControl:1.2.840.113556.1.4.803:=2))(sAMAccountName=*)(mail=*))";
        NamingEnumeration<SearchResult> results = this.context.search(group, searchFilter, this.searchControls);

        List<User> users = new ArrayList<>();
        while (results.hasMore()) {
            users.add(User.userFromAttributes(results.next().getAttributes()));
        }

        this.context.close();
        return users;
    }

    /**
     * Tries to making a new context with credentials of
     *
     * @param user user with credentials
     * @return if the login was successful
     * @throws NamingException
     */
    boolean checkCredentials(User user) throws NamingException {
        try {
            this.context = contextSource.getContext(user.getDistinguishedName(), user.getPassword());
            this.context.addToEnvironment("java.naming.ldap.attributes.binary", "objectGUID");
            this.context.close();
            defaultUser = user.getDistinguishedName();
            defaultPassword = user.getPassword();
            return true;
        } catch (AuthenticationException ex) {
            return false;
        }
    }
}
