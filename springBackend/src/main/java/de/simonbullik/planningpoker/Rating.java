package de.simonbullik.planningpoker;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
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

    @ManyToOne
    private Story story;
    @ManyToOne
    private Card card;
}
