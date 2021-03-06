package de.simonbullik.planningpoker;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * Saves all stories for me
 * http://localhost:8080/stories
 */
@RepositoryRestResource
@CrossOrigin(origins = "http://192.168.2.17:4200")
public interface StoryService extends JpaRepository<Story, Integer> {
}
