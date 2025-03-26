import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import TicketList from "./components/tickets/TicketList.jsx";
import TicketDetails from "./components/tickets/TicketDetails.jsx";
import TicketForm from "./components/tickets/TicketForm.jsx";
import NotFound from "./views/notfound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App should include layout components (Header, Sidebar, Outlet)
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "tickets", element: <TicketList /> },
      { path: "tickets/create", element: <TicketForm /> },
      { path: "tickets/:ticketId", element: <TicketDetails /> },
      { path: "tickets/:ticketId/edit", element: <TicketForm /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;