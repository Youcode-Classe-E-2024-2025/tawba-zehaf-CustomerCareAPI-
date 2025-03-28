import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx"; // Your layout with Header, Sidebar, etc.
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./views/Dashboard.jsx";
import TicketList from "./components/tickets/TicketList.jsx";
import TicketDetails from "./components/tickets/TicketDetails.jsx";
import TicketForm from "./components/tickets/TicketForm.jsx";
import TicketMessages from "./components/tickets/TicketMessages.jsx";
import Activity from "./views/Activity.jsx";
import Logout from "./pages/Logout.jsx";
import NotFound from "./views/notfound.jsx";
import AssignTicket from "./components/tickets/AssignTicket.jsx";
import AgentTicketList from "./components/tickets/AgentTicketList.jsx";
import AssignedTickets from "./views/AssignedTickets.jsx";
import ClosedTickets from "./views/ClosedTickets.jsx";
import MyTickets from "./views/MyTickets.jsx";
import { Navigate } from 'react-router-dom';

import ClientRoute from "./components/ClientRoute.jsx";
import ManagePage from './components/admin/ManagePage';

const router = createBrowserRouter([
  // Utilisation dans les routes
  {
    path: "tickets/assigned",
    element: (
      <ClientRoute>
        <AssignedTickets />
      </ClientRoute>
    ),
  },
  // Public routes (without layout)
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  // Authenticated routes (with layout)
  {
    path: "/",
    element: <App />, // App includes Header, Sidebar, etc.
    children: [
      { path: "home", element: <Dashboard /> },
      { path: "tickets", element: <TicketList /> },
      { path: "tickets/create", element: <TicketForm /> },
      { path: "tickets/:ticketId", element: <TicketDetails /> },
      { path: "tickets/:ticketId/activity", element: <Activity /> },
      { path: "tickets/:ticketId/edit", element: <TicketForm /> },
      { path: "tickets/:ticketId/messages", element: <TicketMessages /> },
      {
        path: "activity",
        element: <Activity />
      },
      { path: "logout", element: <Logout /> },
      { path: "tickets/assigned", element: <AgentTicketList /> },
      // {
      //   path: '/admin/assign-tickets',
      //   element: <div>Sélectionnez un ticket à attribuer.</div>, // Page par défaut
      // },
      {
        path: '/admin/assign-tickets/:ticketId',
        element: <AssignTicket />,
      },
      { 
        path: '/agent/tickets',
        element: <AgentTicketList />
      },
      { path: "tickets/closed", element: <ClosedTickets /> },
      { path: "tickets/my-tickets", element: <MyTickets /> },
      {
        path: '/admin/manage',
        element: <ManagePage />,
      },
    ]
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);

export default router;