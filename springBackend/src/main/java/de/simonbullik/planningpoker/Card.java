package de.simonbullik.planningpoker;

import lombok.Getter;
import org.springframework.stereotype.Component;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Entity /* For saving at the database */
@Component
public class Card {
    @Id
    int id;

    private String value;

    private String texturePath;

    /**
     * required for spring
     */
    protected Card() {

    }

    Card(String value, String texturePath) {
        this.value = value;
        this.id = value.hashCode(); //Sets the id to the hash, to make sure a card has always the same id because spring will add after a new start duplicate cards
        this.texturePath = texturePath;
    }

    @Override
    public String toString() {
        return "Card: " + this.value;
    }
}
