package de.simonbullik.planningpoker;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "/users")
public class UserManager {
    private List<User> users = new ArrayList<>();

    @RequestMapping(path = "/addUser")
    void addUser(@RequestParam(value = "username", required = true) String username) {
        this.users.add(new User(username));
    }

    @RequestMapping(path = "/getUsers")
    public List<User> getUsers() {
        return users;
    }

    @RequestMapping(path = "/getUsersByName")
    public List<User> getUsersByName(@RequestParam(value = "username", required = true) String username) {
        List<User> userWithUsername = new ArrayList<>();
        for (User user : this.users) {
            if (user.getUsername().equalsIgnoreCase(username)) {
                userWithUsername.add(user);
            }
        }
        return userWithUsername;
    }

    @RequestMapping(path = "/getUserById")
    public User getUserById(@RequestParam(value = "id", required = true) int id) {
        for (User user : this.users) {
            if (user.getId() == id) {
                return user;
            }
        }
        return null;
    }
}
