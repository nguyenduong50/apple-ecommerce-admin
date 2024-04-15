import { createBrowserRouter } from "react-router-dom";
import Layout from "~/layout/Layout";
import HomePage from "~/pages/Home";
import ErrorPage from "~/pages/Error";
import UserPage from "~/pages/Users";
import ProductPage from "~/pages/Products";
import OrderPage from "~/pages/Orders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'user',
        element: <UserPage />,
      },
      {
        path: 'product',
        element: <ProductPage />,
      },
      {
        path: 'order',
        element: <OrderPage />,
      },
    ],
  },
]);

export default router;
