package de.simonbullik.planningpoker;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource
@CrossOrigin(origins = "http://192.168.2.17:4200")
public interface CardRepository extends JpaRepository<Card, Integer> {
}
