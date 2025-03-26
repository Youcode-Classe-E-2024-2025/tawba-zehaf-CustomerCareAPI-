import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./views/home.jsx";
import NotFound from "./views/notfound.jsx";
 const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>
  },
  {
        path: "/register",
        element: <Register/>,
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