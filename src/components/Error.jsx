import { isRouteErrorResponse, Link, useRouteError } from "react-router";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
<Chatbot />;
export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            {error.status} {error.statusText}
          </h1>
          <p className="text-gray-700 mb-6">{error.data}</p>
          <Link
            to="/"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Gå til forsiden
          </Link>
        </div>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <>
        <div className="error__wrapper border-4 border-green-500 rounded-lg ">
          <div className=" test_555 flex flex-col items-center justify-center min-h-screen bg-transparent mt-15 ">
            <div className="bg-transparent rounded p-8 max-w-md w-full text-center">
              <h1 className="text-5xl font-extrabold text-green-700 mb-4">
                Error
              </h1>
              <p className="text-zinc-700 text-4xl mb-2">{error.message}</p>
              <p className="text-zinc-800 text-4xl mb-6">go back home</p>
              <Link
                to="/shop"
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Gå til forsiden
              </Link>
            </div>
          </div>
        </div>
        <footer className="text-center text-gray-500 mt-4">
          <Footer />
        </footer>
      </>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            Unknown Error
          </h1>
          <Link
            to="/shop"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Gå til shoppen
          </Link>
        </div>
      </div>
    );
  }
}
