package de.simonbullik.planningpoker;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/cards")
public class CardManager {
    private final static Card[] cards = {
            new Card("?"), new Card("0,5"), new Card("1"), new Card("2"), new Card("3"), new Card("5"), new Card("8"), new Card("13"), new Card("20"), new Card("40")
    };

    @RequestMapping(path = "/all")
    public static Card[] getCards() {
        return cards;
    }
}
