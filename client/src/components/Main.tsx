import {  createBrowserRouter,  RouterProvider} from 'react-router-dom'

import Register from '../pages/Register';
import LogIn from '../pages/LogIn';
import  Manager from './Manager';
import ProjectManagement from '../pages/ProjectManagement';
import ProjectDetail from '../pages/ProjectDetails';


export default function Main() {
  const routers = createBrowserRouter([
    {
      path:"/",
      element:<Register></Register>
    },
    {
      path:"/login",
      element:<LogIn></LogIn>
    },
    {
      path:"/management",
      element:<Manager></Manager>,
      children:[
        {
          path:"",
          element:<ProjectManagement></ProjectManagement>
        },
        {
          path:":id",
          element:<ProjectDetail></ProjectDetail>
        }
      ]
    }
  ])


  return (
    <div>
      <RouterProvider router={routers}></RouterProvider>
    </div>
  );
}
