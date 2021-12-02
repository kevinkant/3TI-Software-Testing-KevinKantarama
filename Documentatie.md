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

Externe Documentatielinks:

https://github.com/testing-library/react-testing-library
https://testing-library.com/docs/react-testing-library/cheatsheet/
https://testing-library.com/docs/queries/about/
https://mswjs.io/



Section 2: simple app Color button
===
In dit hoofdstuk wordt een simpele app gemaakt: een knop waarmee je kleur kan veranderen

De eerste simpele test bekijkt of dat de knop de juiste kleur heeft (Er zijn 2 states, blue of red. 
Als de knop red is dan moet er tekst staan dat zegt "change to blue" en omgekeerd)

```JSX
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('button has correct initial color', () => {
  render(<App />);

  // find an element with a role of button and text of 'Change to blue'
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });

  // expect the background color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: 'red' })

  // click button
  fireEvent.click(colorButton);

  // expect the background color to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });

  // expect the button text to be 'Change to red'
  expect(colorButton).toHaveTextContent('Change to red');
});
```


Vervolgens voeren we de test uit via het npm script "test" (of via terminal `npm test`) en is dit het resultaat
![](https://i.ibb.co/VMBhM4m/image.png)


De volgende taak is om een checkbox toe te voegen aan de pagina en vervolgens te checken of de checkbox gevonden kan worden. 
De checkbox zelf zorgt ervoor dat de knop aan en uit kan. Default state is aan


```JSX
test('initial conditions', () => {
  render(<App />);

  // ceheck that the button starts out enbaled
  const colorButton = screen.getByRole('button', { name: 'Change to blue'})
  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();

})
```

Voor de rest van dit hoofdstuk, zijn er code quizzes voorzien:


```JSX
//Question 1
test('When checkbox is checked, button should be disabled', () => {

  render(<App />)
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button'})
  const colorButton = screen.getByRole('button', { name: 'Change to blue'})

  //click the checkbox
  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  // Click again to disable checkbox
  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
  
})

//Question 2
test('Disabled button has gray background and revers to red', () => {
  render(<App />)
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'})
  const colorButton = screen.getByRole('button', { name: 'Change to blue'})

  //disable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: 'gray'})

  // re-enable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: 'red'})
});

//Question 3
test('Clicked disbaled button has gray background and reverts to blue', () => {
  render(<App />)
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'})
  const colorButton = screen.getByRole('button', { name: 'Change to blue'})

  // change button to blue
  fireEvent.click(colorButton);

  //disable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: gray')

  // re-enable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: red')
})
```




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

In de eerste instantie, maken we een form om een bestelling te plaatsen. Deze form wordt getest op zijn functionaliteit en op popovers in de fields
Eerst worden de checkboxes en buttons getest, dan de popover op de Terms&Conditions en later de text en button functionaliteit.

Dit is de gehanteerde folder structuur 
![](https://i.ibb.co/cySD43K/image.png)

De eerste tests worden gemaakt om te bekijken of:
- Checkbox unchecked by default
- Checking checkbox enables button
- Unchecking checkbox again disables button

test 1
```JSX
import {
  queryByText,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from '@testing-library/user-event';

// Test on the intial conditions (Checkbox is unchecked and button is disabled)
test("Initial conditions", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /Terms and Conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: /Confirm order/i });
  expect(confirmButton).toBeDisabled();
});
```
test 2
```JSX
test("Checkbox disables button on first click and enables on the second click", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /Terms and Conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /Confirm order/i });

  // Click the checkbox to enable
  userEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();

  // Click the checkbox to disable
  userEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});
```

Vervolgens testen we een mouse popover (een element dat kan verdwijnen van de DOM).

Om dit duidelijker te maken, wordt er uitleg gegven over "Screen query methods". Die hebben de volgende vorm: command[all]ByQueryType
**Command**
- get: expect element to be in DOM
- query: expect element not to be in DOM
- find: expect element to appear async (async/await example)

**[All]**
Include all --> Expect more than 1 match

**QueryType**
- Role (most preferred)
- AltText (for img)
- Text (display elements)
- Form elements: Placeholdertext, LabelText and DisplayValue.

Dit is dan de uiteindelijke test voor de popover


test 3
```JSX
test("popover responds to hover", async() => {
  render(<SummaryForm />);

  //Popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  //Popover appears when mouse hovers over the checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument(); // This is added because it's makes the test more readable, it doesn't add any functional purpose

  //Popover dissappears when the mouse hovers away
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );

```
De laatste test word Async uitgevoerd omdat de popover asynchroon verdwijnt. Om dit duidelijk te maken wordt het async/await principe toegevoegd zodat de test niet faalt.





Section 5: Simulating Server Response with Mock Service Worker
===
In dit hoofdstuk wordt gekeken hoe we een mock server aanmaken om na te bootsten hoe data verzonden worden naar de server en hoe we dit kunnen testen.

De volgende tests zullen worden geimplementeerd:
- "Test that option images render"
- Test the Mock service worker
- Mock server response for /scoops and /toppings

Mock Service Worker (https://mswjs.io/) heeft als doel:
- Network calls ontvangen
- Specifieke respsonses returnen

MSW vermijdt network calls tijdens de tests

MSW is een aparte component dat geinstalleerd wordt via `npm install msw`

Via handlers wordt een REST API nagebootst. Een MSW handler heeft de volgende vorm: command

rest.get('http://localhost:3000/scoops', (req, res, ctx) => {})
- rest = Handler Type
- HTTP method: get, post, etc.
- De URL die de "nep" server  is
- Response rsolver function: req (request object), res(function to create response), ctx(utility to build response)

De eerste handler ziet er alsvolgt zo uit: 

```JSX
import { rest } from 'msw'

export const handlers = [
    rest.get('http://localhost:3000/scoops', (req, res, ctx) => {
        return res(
            ctx.json([
                { name: 'Chocolate', imagePath: '/images/chocolate.png' },
                { name: 'Vanilla', imagePath: '/images/vanilla.png' },
              ])
        );
    }),
];
```

Om de mocks te integreren, gebruiken we node.js met jest als testrunner

```JSX
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);
```

Vervolgens moet de app geconfigureerd worden zodat MSW de netwerk requests kan ontvangen en de juiste responses terug geven die we in de handlers hebben opgezet.
Dit word gedaan via boiler plate code uit de documentatie https://mswjs.io/docs/getting-started/integrate/node#using-create-react-app
Wat deze code doet, is de mocks uitvoeren en uiteindelijk de handlers resetten en de server sluiten als de tests gedaan zijn.

Nu focussen we ons op het schrijven van de tests voor de "Order Entry "components". Er wordt getest op:
- Als options component de /scoops endpoint oproept op de server, de scoopOptions haalt en ze vertoont in de ScoopOption component
![](https://i.ibb.co/NsFsp3k/image.png)

Dit is de eerste test

```JSX
import { render, screen } from '@testing-library/react'
import Options from '../Options';

test('displays image for each scoop option from server', async() => {
    render(<Options optionType="scoops" />);

    //find images
    const scoopImages = await screen.findAllByRole('img', {name: /scoop$/i});
    expect(scoopImages).toHaveLength(2); //handler has 2 elements in the array

    //confirm alt text of images to be more sure that you've picked the right picture
    const altText = scoopImages.map((element) => element.altText);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);

})
```

In de tests zelf hoeft er niet verwezen te worden naar MSW. Aangezien de applicatie geconfigureerd is om de calls via MSW op te vangen en de juiste handler response teruggeven

Volgende doelstelling is om de afbeeldingen van de toppings (Garnering) voor de desserts te tonen.

Ten eerste maken we een nieuwe handler

```JSX
rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Cherries', imagePath: '/images/cherries.png' },
        { name: 'M&Ms', imagePath: '/images/m-and-ms.png' },
        { name: 'Hot fudge', imagePath: '/images/hot-fudge.png' },
      ])
    );
  }),
```
