package de.simonbullik.planningpoker;

import org.w3c.dom.ls.LSException;

import java.util.*;

public class PlanningPoker {
    final static Card[] cards = {
            new Card("?"), new Card("0,5"), new Card("1"), new Card("2"), new Card("3"), new Card("5"), new Card("8"), new Card("13"), new Card("20"), new Card("40")
    };

    private int id;
    private List<User> users = new ArrayList<>();
    private List<Story> stories = new ArrayList<>();

    PlanningPoker() {
        Random random = new Random();
        this.id = random.nextInt();
        System.out.println(id);
    }

    int getId() {
        return id;
    }

    void addStory(Story story) {
        this.stories.add(story);
    }

    void join(User user) {
        this.users.add(user);
    }

    public List<User> getUsers() {
        return this.users;
    }

    List<Story> getStories() {
        return this.stories;
    }
}
