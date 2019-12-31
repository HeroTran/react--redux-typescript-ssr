import * as React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Logo } from '@core/ui/atoms';
import { withTranslation, WithTranslation } from 'react-i18next';
import { i18n, TFunction } from 'i18next';
import styles from './Header.scss';

type HeaderProps = {
  title: string;
  className?: string;
  t?: TFunction;
  i18n?: i18n;
};
type HeaderStates = {};
type HeaderType = HeaderProps & WithTranslation;

class Header extends React.Component<HeaderType, HeaderStates> {
  constructor(props: HeaderType) {
    super(props);
  }
  changeLanguage = (lng: string) => {
    this.props.i18n.changeLanguage(lng);
  }
  render() {
    const { t, title, className } = this.props;
    return (
      <React.Fragment>
        <button onClick={this.changeLanguage.bind(this, 'de')}>de</button>
        <button onClick={this.changeLanguage.bind(this, 'en')}>en</button>
        <h2>{t('welcome')}</h2>
        <header className={classNames(styles.header, className)}>
          <Link to="/"><Logo /></Link>
          <Link to="/Header/HeroTran">Header</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <h1 className={styles.title}>{title}</h1>
        </header>
      </React.Fragment>
    );
  }
}
export default withTranslation()(Header);
