import * as React from 'react';
import { PreviewImage } from '@core/ui/atoms';
import { History } from 'history';
import { withTranslation, WithTranslation } from 'react-i18next';
import { i18n, TFunction } from 'i18next';

type UserProps = {
  getUser: (name: string) => void;
  user: any;
  match: HyResult.ReactRouter.MatchParam;
  history: History;
  t: TFunction;
  i18n: i18n;
};
type userStates = {};
type UserType = UserProps & WithTranslation;
class User extends React.Component<UserType, userStates> {
  constructor(props: UserType) {
    super(props);
  }
  componentDidMount() {
    const username = this.props.match.params.uuid;
    if (username) {
      this.props.getUser(username);
    } else {
      this.props.getUser('HeroTran');
    }

  }
  render() {
    const { user, t } = this.props;
    return (
      <React.Fragment>
        {user && (
          <React.Fragment>
            <h1>{user.login} {t('avatar')}</h1>
            <PreviewImage src={user.avatar_url} />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default withTranslation()(User);
