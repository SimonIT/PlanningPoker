package de.simonbullik.planningpoker;

class Story {
    private String description;

    Story(String description) {
        this.description = description;
    }

    String getDescription() {
        return this.description;
    }

    @Override
    public String toString() {
        return this.description;
    }
}
