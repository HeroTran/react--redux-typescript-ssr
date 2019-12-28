import * as React from 'react';
import { PreviewImage } from '@core/ui/atoms';
import { History } from 'history';
type userProps = {
  getUser: (name: string) => void;
  user: any;
  match: HyResult.ReactRouter.MatchParam;
  history: History;
};
type userStates = {};
class User extends React.Component<userProps, userStates> {
  constructor(props: userProps) {
    super(props);
  }
  componentDidMount() {
    this.props.getUser('HeroTran');
  }
  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        {user && (
          <React.Fragment>
            <h1>{user.login} avatar:</h1>
            <PreviewImage src={user.avatar_url} />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default User;
