import { createBrowserRouter } from "react-router-dom";
import Login from "./views/login.jsx";
import Signup from "./views/signup.jsx";
import Home from "./views/home.jsx";
import NotFound from "./views/notfound.jsx";
 const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>
  },
  {
        path: "/signup",
        element: <Signup/>,
  },
  {
        path: "/home",
        element: <Home/>,
  },
  {
        path: "/",
        element: <Home/>,
  },
  {
    path: "*",
    element: <NotFound/>,
},


]);
export default router;