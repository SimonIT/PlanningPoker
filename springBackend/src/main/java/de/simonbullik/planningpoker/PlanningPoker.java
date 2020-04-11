package de.simonbullik.planningpoker;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import javax.persistence.*;
import java.util.*;

@Getter
@Setter
@Entity
@EqualsAndHashCode
class PlanningPoker {

    @Id
    @GeneratedValue
    private int id;

    private int status;

    @NonNull
    private String name;

    private String description;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private Date date;

    @OneToOne
    private User owner;

    boolean allowNotInvitedUser = false;

    @OneToMany
    @Cascade(CascadeType.ALL)
    private List<User> invitedUsers = new ArrayList<>();

    @OneToMany
    @Cascade(CascadeType.ALL)
    private List<User> joinedUsers = new ArrayList<>();

    @OneToMany
    @Cascade(CascadeType.ALL)
    private List<Story> stories = new ArrayList<>();

    @OneToMany
    @Cascade(CascadeType.ALL)
    private List<Card> availableCards = new ArrayList<>();

    PlanningPoker() {
    }

    PlanningPoker(User owner) {
        this.owner = owner;
    }

    @Override
    public String toString() {
        return this.id + " " + this.name;
    }

    /*
    Map<Story, Map<Card, Integer>> getResult() {
        Map<Story, Map<Card, Integer>> stats = new HashMap<>();
        for (Story story : this.stories) {
            Map<Card, Integer> storyStat = new HashMap<>();
            for (User user : this.joinedUsers) {
                if (user.getRating(story) != null) {
                    if (storyStat.containsKey(user.getRating(story))) {
                        storyStat.put(user.getRating(story), storyStat.get(user.getRating(story)) + 1);
                    } else {
                        storyStat.put(user.getRating(story), 1);
                    }
                }
            }
            if (storyStat.size() > 0) {
                stats.put(story, storyStat);
            }
        }
        return stats;
    }*/

}
