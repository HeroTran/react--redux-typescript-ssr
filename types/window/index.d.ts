import { AppState } from '@core/common/rootReducer';

declare global {
  interface Window {
    __INITIAL_STATE__: AppState;
    initialI18nStore: any;
    initialLanguage: any;
  }
}
