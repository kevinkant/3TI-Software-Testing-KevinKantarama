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
 
});
