import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Register from "../pages/Register";
import LogIn from "../pages/LogIn";
import Manager from "./Manager";
import ProjectManagement from "../pages/ProjectManagement";
import ProjectDetail from "../pages/ProjectDetails";
import PersonalMission from "../pages/PersonalMission";

export default function Main() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <Register />,
    },
    {
      path: "/login",
      element: <LogIn />,
    },
    {
      path: "/:userId/management",
      element: <Manager />,
      children: [
        {
          index: true,
          element: <ProjectManagement />,
        },
        {
          path: ":projectId",
          element: <ProjectDetail />,
        },
        {
          path: "person",
          element: <PersonalMission />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routers} />;
}
