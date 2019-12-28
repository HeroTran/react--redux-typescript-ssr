import * as React from 'react';
type RegisterProps = {
  isRegister: boolean;
  handleSubmit: () => void;
  changeToHome: () => void;
};

type RegisterStates = {};
type RegisterType = RegisterProps;

export default class Register extends React.Component<RegisterType, RegisterStates> {
  constructor(props: RegisterProps) {
    super(props);
  }
  componentDidMount() {
    if (this.props.isRegister) {
      this.props.changeToHome();
    }
  }
  render() {
    return (
      <React.Fragment>
        <h1>Register</h1>
      </React.Fragment>
    );
  }
}
