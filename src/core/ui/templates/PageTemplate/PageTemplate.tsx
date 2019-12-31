import * as React from 'react';

import Header from '@core/ui/molecules/Header/Header';

import styles from './PageTemplate.scss';

interface PageTemplateProps {
  title: string;
  auth: false;
  children: React.ReactNode;
}
export class PageTemplate extends React.Component<PageTemplateProps, {}> {
  constructor(props: PageTemplateProps) {
    super(props);
  }
  render() {
    const { title, children } = this.props;
    return (
      <React.Fragment>
        <div className={styles.pageTemplate}>
          <Header title={title} />
          {children}
        </div>
      </React.Fragment>
    );
  }
}
