import * as React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Logo } from '@core/ui/atoms';

import styles from './Header.scss';

interface Props {
  title: string;
  className?: string;
}

export function Header({ title, className }: Props) {
  return (
    <header className={classNames(styles.header, className)}>
      <Link to="/"><Logo /></Link>
      <Link to="/user">User</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}
