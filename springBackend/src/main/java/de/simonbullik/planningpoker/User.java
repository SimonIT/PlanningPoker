package de.simonbullik.planningpoker;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Scope;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.naming.NamingException;
import javax.naming.directory.Attributes;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

@Entity /* For saving at the database */
@Getter
@Setter
@Scope("session") /* For the login, why I don't know */
public class User implements UserDetails {
    public static enum Role {USER}

    @Id
    @Column(unique = true)
    String guid;

    @Column(unique = true)
    String username;

    /**
     * Description of the property password.
     */
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    /**
     * Description of the property role , to grant authority to the user .
     */
    private String role = "USER";

    private String distinguishedName;

    private String fullName;

    private String email;

    /**
     * required for spring
     */
    protected User() {
    }

    User(String fullName) {
        this.fullName = fullName;
    }

    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(role));
        return authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String toString() {
        return "User [id=" + getGuid() + ", username=" + username + "]";
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof User) {
            return ((User) obj).getGuid().equalsIgnoreCase(this.getGuid());
        }
        return false;
    }

    /**
     *
     * @param attributes from the ldap
     * @return new user object
     * @throws NamingException
     */
    static User userFromAttributes(Attributes attributes) throws NamingException {
        User user = new User();
        user.setGuid(Utils.formatGuid((byte[]) attributes.get("objectGUID").get())); // is only possible because I set binary to the ldap environment @see LdapManager
        user.setUsername((String) attributes.get("sAMAccountName").get());
        user.setEmail((String) attributes.get("mail").get());
        user.setFullName((String) attributes.get("name").get());
        user.setDistinguishedName((String) attributes.get("distinguishedName").get());
        return user;
    }
}
