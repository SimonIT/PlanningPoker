package de.simonbullik.planningpoker;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import javax.persistence.*;
import java.security.Principal;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
public class User implements Principal {
    @Id
    @GeneratedValue
    int id;

    String guid;

    String account;

    private String distinguishedName;

    private String name;

    private String email;

    @OneToMany
    @Cascade(CascadeType.ALL)
    private Set<Rating> rating = new HashSet<>();

    @OneToMany
    @Cascade(CascadeType.ALL)
    private Set<PlanningPoker> joinedPlanningpokers = new HashSet<>();

    User() {
    }

    User(String name) {
        this.name = name;
    }
}
