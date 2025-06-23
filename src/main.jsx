<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
=======
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
>>>>>>> 4cc1209d1c7acfe3407f646b90861a0e4df3410a
import router from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
