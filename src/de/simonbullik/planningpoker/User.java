package de.simonbullik.planningpoker;

import java.util.HashMap;
import java.util.Map;

public class User {
    private String name;
    private Map<Story, Card> rating = new HashMap<>();

    User(String name) {
        this.name = name;
    }

    void rate(Story story, Card card) {
        this.rating.put(story, card);
    }

    Card getRating(Story story) {
        return this.rating.get(story);
    }

    @Override
    public String toString() {
        return this.name;
    }
}
