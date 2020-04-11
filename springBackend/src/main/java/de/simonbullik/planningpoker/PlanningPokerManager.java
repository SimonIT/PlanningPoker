package de.simonbullik.planningpoker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping(path = "/planningpokers")
@CrossOrigin(origins = "http://localhost:4200")
class PlanningPokerManager {

    private PlanningPokerRepository planningPokerRepository;

    @Autowired
    PlanningPokerManager(PlanningPokerRepository repository) {
        this.planningPokerRepository = repository;
    }

    @RequestMapping(path = "/createNew")
    PlanningPoker createNewPlanningPoker(@RequestParam(value = "owner") User owner, @RequestParam(value = "stories") Story... stories) {
        PlanningPoker planningPoker = new PlanningPoker(owner);
        for (Story story : stories) {
            planningPoker.getStories().add(story);
        }
        this.planningPokerRepository.save(planningPoker);
        return planningPoker;
    }

    @RequestMapping(path = "/getAll")
    Collection<PlanningPoker> getPlanningPokerRepository() {
        return new ArrayList<>(planningPokerRepository.findAll());
    }

    @RequestMapping(path = "/getByOwner")
    Collection<PlanningPoker> getPlanningPokersByOwner(@RequestParam(value = "user") User user) {
        List<PlanningPoker> planningPokersWithOneOwner = new ArrayList<>();
        for (PlanningPoker planningPoker : this.planningPokerRepository.findAll()) {
            if (planningPoker.getOwner() == user) {
                planningPokersWithOneOwner.add(planningPoker);
            }
        }
        return planningPokersWithOneOwner;
    }

    @RequestMapping(path = "/rate")
    void rate(User user, Story story, Card card) {
        //user.getRating().add(Rating.create(story, card));
    }
}
