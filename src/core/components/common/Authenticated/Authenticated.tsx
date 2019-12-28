import * as React from 'react';
import { connect } from 'react-redux';
import { History } from 'history';

export default (AuthComponent: any) => {
  type AuthenticatedProps = {
    isLoggedIn: boolean;
    history: History;
  };
  class Authenticated extends React.Component<AuthenticatedProps, {}> {
    componentDidMount() {
      if (!this.props.isLoggedIn) {
        this.props.history.push('/login');
      }
    }
    render() {
      if (!this.props.isLoggedIn) {
        return null;
      }
      return (<AuthComponent {...this.props} />);
    }
  }
  const mapStateToProps = () => ({
    isLoggedIn: false
  });
  const mapDispatchToProps = () => ({
  });
  return connect(mapStateToProps, mapDispatchToProps)(Authenticated);
};
