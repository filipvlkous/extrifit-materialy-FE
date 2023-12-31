import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import user from "@testing-library/user-event";
import IndexLogin from "./index";

describe("prvni test", () => {
  beforeEach(() => {
    render(<IndexLogin />);
  });
  it("prvni test componenty", () => {
    // screen.debug();

    const bla = screen.getAllByText(/Prihlasit/);
    expect(bla).exist;
  });

  describe("login Test", () => {
    it("input text", () => {
      user.type(screen.getByLabelText(/Email/), "fvlk@dafit.cz");
      user.type(screen.getByLabelText(/Heslo/), "Heslo123");

      user.click(screen.getByRole("button", { name: "Prihlasit se" }));
    });
  });

  //   it("updates state on button click", async () => {
  //     render(<App />);

  //     const button = screen.getByTestId("buttonTst");
  //     fireEvent.click(button);
  //     expect(await screen.findByText(/count is 1/i)).toBeInTheDocument();
  //   });
});

// describe("druhy test", () => {
//   it("scitani", () => {
//     expect(AddNumb(1, 2)).toBe(3);
//   });

//   it("scitani 2", () => {
//     expect(AddNumb(1, 2)).not.equal(2);
//   });
// });
