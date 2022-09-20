import { render, screen } from "@testing-library/react";
import FormBuilder from "./FormBuilder.jsx";

describe("Form Builder Component", () => {
  it("returns nothing", () => {
    render(<FormBuilder formTree={null} />);
    const component = screen.queryByTestId("form-componenet");

    expect(component).toBeNull();
  });

  it("renders form react element from JSON", () => {
    const exampleInput = {
      type: "text",
      name: "sampleText",
      defaultValue: "example",
    };
    render(<FormBuilder formTree={exampleInput} />);

    const input = screen.getByDisplayValue("example");

    expect(input).toBeInTheDocument();
  });

  it("label elements has extra property called `labelText`", () => {
    const labellednput = {
      type: "label",
      labelText: "Example Input:",
      children: [
        {
          type: "text",
          name: "sampleText",
          defaultValue: "example",
        },
      ],
    };
    render(<FormBuilder formTree={labellednput} />);

    const input = screen.getByLabelText("Example Input:");

    expect(input).toBeInTheDocument();
  });
});
