package de.simonbullik.planningpoker;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public interface RatingService extends CrudRepository<Rating, Integer> {
    Set<Rating> findByStory(Story story);
}