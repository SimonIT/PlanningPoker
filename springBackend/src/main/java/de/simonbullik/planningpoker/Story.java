package de.simonbullik.planningpoker;

import lombok.Data;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data /* creates getter, setter, ... */
@Entity /* For saving at the database */
public class Story {
    @Id
    @GeneratedValue
    int id;

    @Setter
    private String description;

    protected Story() {
    }

    Story(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return this.description;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Story) {
            return ((Story) obj).getId() == this.getId();
        }
        return false;
    }
}
