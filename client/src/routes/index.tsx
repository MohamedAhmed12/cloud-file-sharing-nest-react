import { createBrowserRouter } from 'react-router-dom';
import App from '../pages/App';
import Register from '../pages/Register';
import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/Login';

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
