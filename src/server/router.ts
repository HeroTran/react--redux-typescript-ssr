import { StaticRouterContext } from 'react-router';
import { matchRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import express from 'express';

import { appRoutes } from '@core/common/appRoutes';
import { configureStore } from '@core/common/store';
import { preloadActions } from '@core/common/preload';

import { renderApp, renderHtml } from './lib/render';
import { fillStore, getPreloadActionsFromRoutes } from './lib/utils';

export const router = express.Router();

router.get(['/*/:param', '*'], async (req, res, next) => {
  try {
    const reqUrl: string = req.url.split(/[?#]/)[0];
    if (reqUrl.indexOf('robots') !== -1 || reqUrl.indexOf('sitemap.xml') !== -1) {
      if (reqUrl.indexOf('robots') !== -1) {
        res.sendFile('/robots.txt', { root: __dirname });
      } else {
        res.sendFile('/sitemap.xml', { root: __dirname });
      }
    } else {
      const { css: styles, js: scripts } = res.locals.assets;
      const context: StaticRouterContext = {};
      const matchedRoutes = matchRoutes(appRoutes, reqUrl);
      const store = configureStore();

      const routesActions = getPreloadActionsFromRoutes(matchedRoutes);
      const actions = preloadActions.concat(routesActions);

      await fillStore(actions, store, req.url);

      const content = renderApp(store, context, req.url);

      if (context.statusCode && String(context.statusCode).startsWith('30') && context.url) {
        return res.redirect(context.statusCode, context.url);
      }

      if (context.statusCode === 404) {
        res.status(404);
      }

      const initialI18nStore = {};
      req['i18n'].languages.forEach((lang: string | number) => {
        initialI18nStore[lang] = req['i18n'].services.resourceStore.data[lang];
      });
      const initialLanguage = req['i18n'].language === 'vi' ? 'en' : req['i18n'].language;

      const initialValues = `
            window.__INITIAL_STATE__ = ${serialize(store.getState())};
          `;

      const initialI18nStoreString = `
            window.initialI18nStore = JSON.parse('${JSON.stringify(initialI18nStore)}');
          `;
      const initialLanguageString = `
            window.initialLanguage = '${initialLanguage}';
          `;

      res.send(renderHtml({ content, styles, scripts, initialValues, initialI18nStoreString, initialLanguageString }));
    }
  } catch (error) {
    next(error);
  }
});
