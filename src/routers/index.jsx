import { createBrowserRouter } from "react-router-dom";
import Layout from "~/layout/Layout";
import HomePage from "~/pages/Home";
import ErrorPage from "~/pages/Error";
import UserPage from "~/pages/Users";
import ProductPage from "~/pages/Products";
import OrderPage from "~/pages/Orders";
import CreateProductPage from "~/pages/Products/create";
import EditProductPage from "~/pages/Products/edit";
import Login from "../pages/Auth/login";

import {action as createProduct} from '~/pages/Products/create';
import {action as editProduct} from '~/pages/Products/edit';
import { checkAuthLoader } from "~/utils/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    loader: checkAuthLoader,
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
        children: [
          {
            index: true,
            element: <ProductPage />,
          },
          {
            path:'create',
            element: <CreateProductPage />,
            action: createProduct
          },
          {
            path:'edit/:id',
            element: <EditProductPage />,
            action: editProduct
          }
        ]
      },
      {
        path: 'order',
        element: <OrderPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />
  }
]);

export default router;
