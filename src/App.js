import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/home";
import NewContact from "./pages/newContact";
import ContactDetails from "./pages/contactDetails";
import EditContact from "./pages/editContact";
import Layout from "./components/rootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },

      {
        path: ":contactId",
        id: "contactId",
        element: <ContactDetails />,
        // children: [
        //   {
        //     path: "edit",
        //     element: <EditContact />,
        //   },
        // ]
      },

      { path: "new", element: <NewContact /> },

      {
        path: "edit/:contactId",
        id: "edit-contactId",
        element: <EditContact />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
