package de.simonbullik.planningpoker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.util.Arrays;

@RestController
@RequestMapping(path = "/cardManager")
@CrossOrigin(origins = "http://192.168.2.17:4200")
public class CardManager {
    private static final String imgPath = "assets/img/";

    private final static Card[] cards = {
            new Card("?", imgPath + "question_mark.png"),
            new Card("0,5", imgPath + "half.png"),
            new Card("1", imgPath + "one.png"),
            new Card("2", imgPath + "two.png"),
            new Card("3", imgPath + "three.png"),
            new Card("5", imgPath + "five.png"),
            new Card("8", imgPath + "eight.png"),
            new Card("13", imgPath + "thirteen.png"),
            new Card("20", imgPath + "twenty.png"),
            new Card("40", imgPath + "forty.png")
    };

    private CardRepository cardRepository;

    @Autowired
    CardManager(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    /**
     * @return All existing cards
     */
    @RequestMapping(path = "/getAll")
    public static Card[] getCards() {
        return cards;
    }

    /**
     * Adds all predefined cards to the repository after spring startup
     */
    @PostConstruct
    void saveCardsToDatabase() {
        this.cardRepository.saveAll(Arrays.asList(cards));
    }
}
