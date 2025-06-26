import express from 'express';
import basicAuth from 'basic-auth';

export function returnJson<T>(
  json: T
): (req: express.Request, res: express.Response) => express.Response {
  return (req, res): express.Response => res.json(json);
}

export function returnJsonFile(
  filename: string
): (req: express.Request, res: express.Response) => express.Response {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-dynamic-require, global-require
  return returnJson(require(filename));
}

export function auth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.Response {
  const user = basicAuth(req);
  if (user && user.name === 'foo' && user.pass === 'bar') {
    next();
  } else {
    res
      .set('WWW-Authenticate', 'Basic realm=Authorization Required')
      .sendStatus(401);
  }
  return res;
}
