import { connect } from 'react-redux';
import User from '../../components/User/User';
import { getUser } from '../../features/common/effects';
import { userSelector } from '../../features/common/selectors';
import Authenticated from '../../components/common/Authenticated/Authenticated';

// tslint:disable-next-line: no-any
const mapStateToProps = (state: any) => ({
    user: userSelector(state)
});

// tslint:disable-next-line: no-any
const mapDispatchToProps = (dispatch: any) => ({
    getUser: (name: string) => dispatch(getUser(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Authenticated(User));
