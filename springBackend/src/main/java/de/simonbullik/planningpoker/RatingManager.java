package de.simonbullik.planningpoker;

import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/ratingManager")
@CrossOrigin(origins = "http://192.168.2.17:4200")
public class RatingManager {

    private RatingService ratingService;

    @Autowired
    RatingManager(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @RequestMapping(path = "/getByPlanningPokerAndStory")
    List<Rating> getByPlanningPokerAndStory(@RequestParam int planningPokerId, @RequestParam int storyId) {
        List<Rating> ratings = Lists.newArrayList();
        for (Rating rating : this.ratingService.findAll()) {
            if (rating.getPlanningPoker().getId() == planningPokerId && rating.getStory().getId() == storyId) {
                ratings.add(rating);
            }
        }
        return ratings;
    }

    @RequestMapping(path = "/hasRated")
    Rating hasRated(@RequestParam int planningPokerId, @RequestParam int storyId, @RequestParam String userGuid) {
        for (Rating rating : this.ratingService.findAll()) {
            if (rating.getPlanningPoker().getId() == planningPokerId && rating.getStory().getId() == storyId && rating.getOwner().getGuid().equalsIgnoreCase(userGuid)) {
                return rating;
            }
        }
        return null;
    }
}
