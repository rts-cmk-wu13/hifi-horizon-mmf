import { isRouteErrorResponse, Link, useRouteError } from "react-router";

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>De relevante folk har fået besked.</p>
        <Link to="/">Gå til forsiden</Link>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
