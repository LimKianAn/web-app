import { render, screen, waitFor } from "@testing-library/react";
import YearMonthSelector from "./YearMonthSelector";
import CtxProvider from "./CtxProvider";

describe("YearMonthSelector", () => {
  beforeEach(() => {
    render(
      <CtxProvider>
        <YearMonthSelector />
      </CtxProvider>
    );
  });

  it("tests if the current year is displayed", () => {
    expect(screen.getByText(String(new Date().getFullYear()))).toBeInTheDocument;
  });

  it("tests if the current month is displayed", () => {
    expect(screen.getByText(String(new Date().getMonth()))).toBeInTheDocument;
  });
});
