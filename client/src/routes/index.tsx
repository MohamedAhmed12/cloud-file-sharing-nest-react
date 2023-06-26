import { createBrowserRouter } from 'react-router-dom';
import App from '../pages/app';
import Register from '../pages/register';
import ErrorPage from '../pages/error-page';
import Login from '../pages/login';

const Routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'auth/register',
    element: <Register />,
  },
  {
    path: 'auth/login',
    element: <Login />,
  },
]);

export default Routes;
