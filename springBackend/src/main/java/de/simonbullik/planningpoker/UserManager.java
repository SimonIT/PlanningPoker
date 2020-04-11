package de.simonbullik.planningpoker;

import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import javax.naming.NamingException;
import java.util.List;

@RestController
@RequestMapping(path = "/userManager")
@CrossOrigin(origins = "http://192.168.2.17:4200")
public class UserManager {

    private LdapManager manager;
    private UserRepository userRepository;

    @Autowired
    UserManager(LdapManager ldapManager, UserRepository userRepository) {
        this.manager = ldapManager;
        this.userRepository = userRepository;
    }

    /**
     * @return a list of users from ldap
     */
    @RequestMapping(path = "/getAll")
    public List<User> getAll() {
        try {
            return manager.getAllUser();
        } catch (NamingException e) {
            e.printStackTrace();
            return Lists.newArrayList();
        }
    }

    /**
     * @param username the username to search
     * @return new user object
     */
    @RequestMapping(path = "/getByUsername")
    public User getUserByUsername(@RequestParam(value = "username", required = true) String username) {
        try {
            return this.manager.getUser(username);
        } catch (NamingException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * saves all users from the ldap to our database after starting the server
     */
    @PostConstruct
    void saveUsers() {
        try {
            this.userRepository.saveAll(this.manager.getAllUser());
        } catch (NamingException e) {
            e.printStackTrace();
        }
    }
}
