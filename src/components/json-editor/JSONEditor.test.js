import { render, screen } from "@testing-library/react";
import MatchMediaMock from "jest-matchmedia-mock";

import JSONEditor from "./JSONEditor";

describe("JSON Editor", () => {
  let matchMedia;

  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  it("render Editor", async () => {
    render(<JSONEditor />);

    const editor = await screen.findByRole("textbox");

    expect(editor).toBeInTheDocument();
  });
});
