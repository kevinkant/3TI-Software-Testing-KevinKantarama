# Documentatie Software testing: React testing library with Jest

Collectie van de uitgewerkte opdrachten met screenshots

* Section 1 is niet gedocumenteerd omdat het een theoretische inleiding was

Voor snelle navigatie is er een inhoudstafel voorzien

Inhoudstafel
===
- [Inhoudstafel](#inhoudstafel)
- [Section 2: simple app Color button](#section-2--simple-app-color-button)
- [Section 3: ESLint with Testing Library + Prettier](#section-3--eslint-with-testing-library---prettier)
- [Section 4: Sundaes On Demand: Form review and popover](#section-4--sundaes-on-demand--form-review-and-popover)




Section 2: simple app Color button
===
In dit hoofdstuk wordt een simpele app gemaakt: een knop waarmee je kleur kan veranderen

De eerste simpele test bekijkt of dat de knop de juiste kleur heeft (Er zijn 2 states, blue of red. 
Als de knop red is dan moet er tekst staan dat zegt "change to blue" en omgekeerd)

![](https://i.ibb.co/bF1Mw5Q/image.png)
![](https://i.ibb.co/f2MPXWz/image.png)

Vervolgens voeren we de test uit via het npm script "test" (of via terminal `npm test`) en is dit het resultaat
![](https://i.ibb.co/VMBhM4m/image.png)


De volgende taak is om een checkbox toe te voegen aan de pagina en vervolgens te checken of de checkbox gevonden kan worden. 
De checkbox zelf zorgt ervoor dat de knop aan en uit kan. Default state is aan

![](https://i.ibb.co/KsYPm2Z/image.png)

Voor de rest van dit hoofdstuk, zijn er code quizzes voorzien:

**Q1: confirm button disable on Checkbox check**
"When the checkbox is check, button should be disabled"

Dit is het antwoord voor deze test

![](https://i.ibb.co/MR0122f/image.png)




Section 3: ESLint with Testing Library + Prettier
===

Dit hoofdstuk was bestemd om ESlint en Prettier te installeren voor automatische formatting van je code en het automatisch zoeken van errors
Aangezien ik deze extensions al gebruik, hebt ik dit hoofdstuk overgeslagen




Section 4: Sundaes On Demand: Form review and popover
===
In dit hoofdstuk wordt een nieuwe applicatie gemaakt die het volgende doet:
- Ijssmaken kiezen en een bestelling plaatsen
- De smaken komen van de server
- Bestellingen worden naar de server verstuurd

Met deze app kunnen we de volgende zaken testen:
- Complexere user interactions (meerdere fases, meerdere mogelijkheden)
- Mouseover popup --> testen van elementen die verdwijnen van de DOM
- Nabootsen van server response via een "mock service worker"
- Async updates --> Wachten op verandering in de DOM voordat we assertions doen
- Globale state via Context API van react --> niet kijken naar de implementatie, maar naar het testing gedrag als gezien door de gebruiker

In de eerste instantie, testen we de opmaak en werking van de pagina, in het volgende hoofdstuk wordt de Mock Service Worker toegevoegd om het gedrag van een server na te bootsen







Section 5: Simulating Server Response with Mock Service Worker
===
In dit hoofdstuk wordt gekeken hoe we een mock server aanmaken om na te bootsten hoe data verzonden worden naar de server en hoe we dit kunnen testen.

De volgende tests zullen worden geimplementeerd:
- "Test that option images render"
- Test the Mock service worker
- Mock server response for /scoops and /toppings

Mock Service Worker (https://mswjs.io/) heeft als doel:
- Network calls ontavangen
- Specifieke respsonses returnen

MSW vermijdt network calls tijdens de tests

MSW is een aparte component dat geinstalleerd wordt via `npm install msw`