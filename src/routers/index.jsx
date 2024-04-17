import { createBrowserRouter } from "react-router-dom";
import Layout from "~/layout/Layout";
import HomePage from "~/pages/Home";
import ErrorPage from "~/pages/Error";
import UserPage from "~/pages/Users";
import ProductPage from "~/pages/Products";
import OrderPage from "~/pages/Orders";
import CreateProductPage from "~/pages/Products/create";
import EditProductPage from "~/pages/Products/edit";

import {action as createProduct} from '~/pages/Products/create';
import {action as editProduct} from '~/pages/Products/edit';

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
]);

export default router;
