
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import theme from '~/theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from "react-router-dom";
import router from './routers';

ReactDOM.createRoot(document.getElementById('root')).render(
  <CssVarsProvider theme={theme}>
    <CssBaseline />
      <RouterProvider router={router} />
    <ToastContainer theme="colored" pauseOnFocusLoss={false} />
  </CssVarsProvider>,
)
