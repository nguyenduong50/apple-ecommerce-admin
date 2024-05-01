import { createBrowserRouter } from "react-router-dom";
import Layout from "~/layout/Layout";
import HomePage from "~/pages/Home";
import ErrorPage from "~/pages/Error";
import UserPage from "~/pages/Users";
import ProductPage from "~/pages/Products";
import OrderPage from "~/pages/Orders";
import CreateProductPage from "~/pages/Products/create";
import EditProductPage from "~/pages/Products/edit";
import Login from "~/pages/Auth/login";
import ChatPage from "~/pages/Chat/Chat";
import OrderDetailPage from "~/pages/Orders/details";

import {action as createProduct} from '~/pages/Products/create';
import {action as editProduct} from '~/pages/Products/edit';
import { checkAuthLoader } from "~/utils/auth";
import { authorize } from "~/utils/authorize";

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
        loader: authorize
      },
      {
        path: 'user',
        element: <UserPage />,
        loader: authorize
      },
      {
        path: 'product',
        loader: authorize,
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
        loader: authorize,
        children: [
          {
            index: true,
            element: <OrderPage />
          },
          {
            path: ':id',
            element: <OrderDetailPage />
          }
        ]
      },
      {
        path: 'chat',
        element: <ChatPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />
  }
]);

export default router;
