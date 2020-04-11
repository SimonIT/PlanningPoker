package de.simonbullik.planningpoker;

public class Card {
    private String value;

    Card(String value) {
        this.value = value;
    }

    int getValueAsInt() {
        return Integer.parseInt(this.value);
    }

    @Override
    public String toString() {
        return this.value;
    }
}
