import { AppRoute } from '@core/common/appRoutes';
import UserContainer from '../containers/User/UserContainer';
import LoginContainer from '../containers/LoginRegister/LoginContainer';
import RegisterContainer from '../containers/LoginRegister/RegisterContainer';
import NoMatch from '../features/common/NoMatch';
export const routes: AppRoute[] = [
  {
    path: '/',
    exact: true,
    component: UserContainer,
  },
  {
    path: '/user',
    exact: true,
    component: UserContainer,
  },
  {
    path: '/login',
    exact: true,
    component: LoginContainer,
  },
  {
    path: '/register',
    exact: true,
    component: RegisterContainer,
  },
  {
    path: '*',
    component: NoMatch,
  },
];
