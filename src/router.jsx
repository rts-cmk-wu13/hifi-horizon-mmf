import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
