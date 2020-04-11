package de.simonbullik.planningpoker;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("account")
public class AccountController {

    private static final Logger logger = LoggerFactory.getLogger(AccountController.class);

    /**
     * @param principal the user who wants log in
     * @return principal
     */
    @CrossOrigin(origins = "http://192.168.2.17:4200")
    @RequestMapping("/login")
    public Principal user(Principal principal) {
        logger.info("user logged " + principal);
        return principal;
    }
}
