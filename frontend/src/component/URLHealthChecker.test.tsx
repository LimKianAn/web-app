import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import URLHealthChecker, { loadingText, notReachableText } from "./URLHealthChecker";
import { isURLHealthy } from "../pkg/remoteResource";

export const server = setupServer(
  rest.get("/healthy", (req, res, ctx) => {
    return res(
      ctx.json({
        status: "healthy",
        message: "OK",
      })
    );
  }),

  rest.get("/unhealthy", (req, res, ctx) => {
    return res(
      ctx.json({
        status: "unhealthy",
        message: "OK",
      })
    );
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
afterAll(() => server.close());

describe("ResourceChecker", () => {
  afterEach(() => server.resetHandlers());

  const healthyText = "healthy";

  it("shows the child node upon a healthy endpoint", async () => {
    render(
      <URLHealthChecker url="/healthy" isURLHealthy={isURLHealthy}>
        <h1>{healthyText}</h1>
      </URLHealthChecker>
    );

    // In the beginning
    expect(screen.getByText(loadingText)).toBeInTheDocument();

    // In the end
    await waitFor(() => screen.getByText(healthyText));
    expect(screen.getByText(healthyText)).toBeInTheDocument();
  });

  it("expresses URL isn't reachable upon an unhealthy endpoint", async () => {
    render(
      <URLHealthChecker url="/unhealthy" isURLHealthy={isURLHealthy}>
        <h1>{healthyText}</h1>
      </URLHealthChecker>
    );

    // In the beginning
    expect(screen.getByText(loadingText)).toBeInTheDocument();

    // In the end
    await waitFor(() => screen.getByText(notReachableText));
    expect(screen.getByText(notReachableText)).toBeInTheDocument();
  });

  it("expresses URL isn't reachable upon an non-existent endpoint", async () => {
    render(
      <URLHealthChecker url="/non-existent" isURLHealthy={isURLHealthy}>
        <h1>{healthyText}</h1>
      </URLHealthChecker>
    );

    // In the beginning
    expect(screen.getByText(loadingText)).toBeInTheDocument();

    // In the end
    await waitFor(() => screen.getByText(notReachableText));
    expect(screen.getByText(notReachableText)).toBeInTheDocument();
  });
});
