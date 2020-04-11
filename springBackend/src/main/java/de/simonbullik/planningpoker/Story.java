package de.simonbullik.planningpoker;

import lombok.Data;
import lombok.Setter;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Random;

@Data /* creates getter, setter, ... */
@Entity /* For saving at the database */
public class Story {
    @Id
    @GeneratedValue
    int id;

    @Setter
    private String description;

    Story() {
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
