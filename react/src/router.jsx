import { createBrowserRouter } from "react-router-dom";
import Login from "./views/login.jsx";
import Signup from "./views/signup.jsx";
import Home from "./views/home.jsx";
 const router = createBrowserRouter([
  {
    path: "/login",
    element: <login/>,
  },
  {
        path: "/signup",
        element: <Signup/>,
  },
  {
        path: "/home",
        element: <Home/>,
  },

]);
export default router;