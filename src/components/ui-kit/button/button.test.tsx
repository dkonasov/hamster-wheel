import React from "react";
import client, { Root } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { Button } from "./button";

let container: HTMLDivElement | null = null;
let root: Root | null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = client.createRoot(container);
});

afterEach(() => {
  act(() => {
    root.unmount();
  });
  root = null;
  container.remove();
  container = null;
});

describe("Button component", () => {
  it("should render button", () => {
    act(() => {
      root.render(<Button>Test</Button>);
    });

    expect(container.innerHTML).toMatchSnapshot();
  });
});
