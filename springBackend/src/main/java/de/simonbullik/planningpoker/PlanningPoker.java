package de.simonbullik.planningpoker;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import javax.persistence.*;
import java.util.*;

@Getter
@Setter
@Entity /* For saving at the database */
@EqualsAndHashCode
class PlanningPoker {

    @Id
    @GeneratedValue
    private int id;

    int status;
    //TODO different states suggestions: (Maybe ENUM) open, started, closed, (...); open ->  user can join, started -> user can rate, closed -> only the result is displayable; owner has button to start and close (Maybe reopen?)

    private String name;

    private String description;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private Date date;

    @OneToOne
    @Cascade(CascadeType.SAVE_UPDATE)
    private User owner;

    boolean allowNotInvitedUser = false;

    @ManyToMany
    @Cascade(CascadeType.SAVE_UPDATE)
    private List<User> invitedUsers = new ArrayList<>();

    @ManyToMany
    @Cascade(CascadeType.SAVE_UPDATE)
    private List<User> joinedUsers = new ArrayList<>();

    @OneToMany
    @Cascade(CascadeType.SAVE_UPDATE) //TODO delete the storie if the plannningpoker gets deleted
    private List<Story> stories = new ArrayList<>();

    @ManyToMany
    @Cascade(CascadeType.SAVE_UPDATE)
    private List<Card> availableCards = new ArrayList<>();

    /**
     * required for spring
     */
    PlanningPoker() {
    }

    PlanningPoker(User owner) {
        this.owner = owner;
    }

    @Override
    public String toString() {
        return this.id + " " + this.name;
    }


    @Override
    public boolean equals(Object obj) {
        if (obj instanceof PlanningPoker) {
            return ((PlanningPoker) obj).getId() == this.getId();
        }
        return false;
    }
}
