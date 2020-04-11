package de.simonbullik.planningpoker;

public class Main {


    public static void main(String[] args) {
        PlanningPokerManager planningPokerManager = new PlanningPokerManager();
        PlanningPoker p = planningPokerManager.createNewPlanningPoker(new Story("Praktikant in Empfang"), new Story("Anmeldung"), new Story("Weg zeigen"), new Story("Java einrichten"));

        User simon = new User("Simon");
        User hannes = new User("Hannes");
        PlanningPoker planningPoker = planningPokerManager.getPlanningPokerById(p.getId());
        planningPoker.join(simon);
        planningPoker.join(hannes);
        simon.rate(planningPoker.getStories().get(0), PlanningPoker.cards[2]);
        hannes.rate(planningPoker.getStories().get(0), PlanningPoker.cards[1]);
        System.out.println("Simon: " + planningPoker.getStories().get(0) + " " + simon.getRating(planningPoker.getStories().get(0)));
        System.out.println("Hannes: " + planningPoker.getStories().get(0) + " " + hannes.getRating(planningPoker.getStories().get(0)));
    }
}
