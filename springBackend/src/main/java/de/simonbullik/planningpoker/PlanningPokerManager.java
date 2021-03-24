package de.simonbullik.planningpoker;

import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(path = "/planningpokers")
@CrossOrigin(origins = "http://192.168.2.17:4200")
class PlanningPokerManager {

    private PlanningPokerRepository planningPokerRepository;

    @Autowired
    PlanningPokerManager(PlanningPokerRepository repository) {
        this.planningPokerRepository = repository;
    }

    /**
     * filters all planningpokers which the user created
     *
     * @param user the owner
     * @return list with planningpokers
     */
    @RequestMapping(path = "/getByOwner")
    Collection<PlanningPoker> getPlanningPokersByOwner(@RequestBody User user) {
        List<PlanningPoker> planningPokers = Lists.newArrayList();
        for (PlanningPoker planningPoker : this.planningPokerRepository.findAll()) {
            if (planningPoker.getOwner() != null && planningPoker.getOwner().equals(user)) {
                planningPokers.add(planningPoker);
            }
        }
        return planningPokers;
    }

    /**
     * filters all planningpokers where the user joined
     *
     * @param user the joined user
     * @return list with planningpokers
     */
    @RequestMapping(path = "/getJoined")
    Collection<PlanningPoker> getJoinedPlanningPokers(@RequestBody User user) {
        List<PlanningPoker> planningPokers = Lists.newArrayList();
        for (PlanningPoker planningPoker : this.planningPokerRepository.findAll()) {
            for (User joinedUser : planningPoker.getJoinedUsers()) {
                if (joinedUser.equals(user)) {
                    planningPokers.add(planningPoker);
                }
            }
        }
        return planningPokers;
    }

    /**
     * filters all planningpokers where the user were invited
     *
     * @param user the invited user
     * @return list with planningpokers
     */
    @RequestMapping(path = "/getInvited")
    Collection<PlanningPoker> getInvitedPlanningPokers(@RequestBody User user) {
        List<PlanningPoker> planningPokers = Lists.newArrayList();
        for (PlanningPoker planningPoker : this.planningPokerRepository.findAll()) {
            for (User joinedUser : planningPoker.getInvitedUsers()) {
                if (joinedUser.equals(user)) {
                    planningPokers.add(planningPoker);
                }
            }
        }
        return planningPokers;
    }
}
