import * as React from 'react';
import { History } from 'history';
import './login.scss';
type LoginProps = {
  isLogin: boolean;
  history: History
};

type LoginStates = {};
type LoginType = LoginProps;

export default class Login extends React.Component<LoginType, LoginStates> {
  constructor(props: LoginProps) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <h1>Login</h1>
      </React.Fragment>
    );
  }
}
