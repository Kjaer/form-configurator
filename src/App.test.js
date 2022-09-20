import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MatchMediaMock from "jest-matchmedia-mock";

import App from "./App";
import FormBuilder from "./components/form-builder/FormBuilder";

jest.mock("./exampleForm.json", () => "");

describe("Veeam form configurator app", () => {
  let matchMedia;

  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  it("renders given JSON as form", async () => {
    const user = userEvent.setup();

    render(<App />);

    const editor = await screen.findByRole("textbox");
    const testFormConfig =
      '{{"type": "text", "name": "firstName", "placeholder": "Max"}';
    await user.type(editor, testFormConfig);

    // await new Promise(process.nextTick);

    const createFormButton = await screen.findByText("CREATE FORM");
    await user.click(createFormButton);
    const generatedText = await screen.findByPlaceholderText("Max");
    expect(generatedText).toBeInTheDocument();
  });

  it("shows error if given JSON is faulty", async () => {
    const user = userEvent.setup();

    render(<App />);

    const editor = await screen.findByRole("textbox");
    const testFormConfig = '{{"type": "invalid type"}';
    await user.type(editor, testFormConfig);

    const createFormButton = await screen.findByText("CREATE FORM");
    await user.click(createFormButton);

    expect(FormBuilder).toThrowError();
    expect(screen.getByText("An error occurred:")).toBeInTheDocument();
    expect(screen.getByText("Return to Editor")).toBeInTheDocument();
  });
});
