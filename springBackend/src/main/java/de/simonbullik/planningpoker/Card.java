package de.simonbullik.planningpoker;

import lombok.Getter;
import org.springframework.stereotype.Component;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter
@Entity
@Component
public class Card {
    @Id
    @GeneratedValue
    int id;

    private String value;

    private String texturePath;

    Card() {

    }

    Card(String value, String texturePath) {
        this.value = value;
        this.texturePath = texturePath;
    }

    @Override
    public String toString() {
        return "Card: " + this.value;
    }
}
