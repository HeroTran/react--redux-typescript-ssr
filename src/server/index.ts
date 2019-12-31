import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import express from 'express';
import helmet from 'helmet';
import path from 'path';

import 'isomorphic-fetch';
import './exitHandler';

import { assetsParser } from './middlewares/assetsParser';
import { getRequire } from './lib/utils';
import { router } from './router';

// language
import Backend from 'i18next-node-fs-backend';
import i18n from './../../i18n';
import fs from 'fs';
// tslint:disable:no-console

const isProduction = process.env.NODE_ENV === 'production';
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3001;
const app = express();

app.disable('x-powered-by');

app.use(helmet());

if (isProduction) {
  // In real app better to use nginx for static assets
  const httpHeaders = { maxAge: 31536000, redirect: false, lastModified: true };
  app.use(express.static(path.resolve(process.cwd(), 'dist'), httpHeaders));
}

if (!isProduction) {
  const webpackConfig = getRequire()(path.resolve(process.cwd(), 'webpack.config'));
  const compiler = webpack(webpackConfig);
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      serverSideRender: true,
      stats: 'errors-only',
      logLevel: 'error'
    })
  );
  app.use(webpackHotMiddleware(compiler, { log: console.log }));
}

app.use(assetsParser(isProduction));
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: any) => path.resolve(appDirectory, relativePath);
const appSrc = resolveApp('src/core');
const i18nextMiddleware = require('i18next-express-middleware');
console.log('appSrc', appSrc);
i18n
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init(
    {
      debug: isProduction ? false : true,
      preload: ['en', 'de'],
      ns: ['translations'],
      defaultNS: 'translations',
      backend: {
        loadPath: `${appSrc}/assets/locales/{{lng}}/{{ns}}.json`,
        addPath: `${appSrc}/assets/locales/{{lng}}/{{ns}}.missing.json`
      }
    },
    () => {
      app
        .use(i18nextMiddleware.handle(i18n))
        .use('/locales', express.static(`${appSrc}/assets/locales`))
        .use('/', router);
    }
  );

app.use((err: string, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!isProduction) {
    return res.status(500).send(err);
  }

  return res.sendStatus(500);
});

app.listen(port, () => {
  console.info(`✅✅✅ Server is running at http://${host}:${port} ✅✅✅`);
});
