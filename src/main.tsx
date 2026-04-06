import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import JobDetail from "./pages/JobDetail";
import Jobs from "./pages/jobs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/jobs" />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/jobs/:id", 
    element: <JobDetail />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);