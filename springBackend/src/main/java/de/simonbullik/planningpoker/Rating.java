package de.simonbullik.planningpoker;

import lombok.Data;

import javax.persistence.*;

@Data /* creates getter, setter, ... */
@Entity /* For saving at the database */
public class Rating {
    @Id
    @GeneratedValue
    int id;

    static Rating create(Story story, Card card) {
        Rating rating = new Rating();
        rating.story = story;
        rating.card = card;
        return rating;
    }

    @OneToOne
    PlanningPoker planningPoker;

    @OneToOne
    User owner;

    @ManyToOne
    private Story story;
    @ManyToOne
    private Card card;

    @Override
    public String toString() {
        return "Rating [id=" + getId() + ", username=" + getOwner().username + ", story=" + getStory().getId() + ", card=" + getCard().getValue() + "]";
    }
}
