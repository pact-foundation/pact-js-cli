import express from 'express';
import http from 'http';
import cors from 'cors';
import _ from 'underscore';
import bodyParser from 'body-parser';
import { auth, returnJson } from './data-utils';

export default (port: number): Promise<http.Server> => {
  const BROKER_HOST = `http://localhost:${port}`;
  const server: express.Express = express();
  server.use(cors());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  function pactFunction(
    req: express.Request,
    res: express.Response
  ): express.Response {
    if (
      _.isEmpty(req.body)
      // ||
      // // 2. Is there a consumer, provider and version in the request?
      // _.isEmpty(req.params['consumer']) ||
      // _.isEmpty(req.params['provider']) ||
      // _.isEmpty(req.params['version'])
    ) {
      return res.sendStatus(400);
    }
    return res.status(201).json(
      {
  "logs": [
    {
      "level": "debug",
      "message": "Created consumer version 1.0.0 with tags test, latest",
      "deprecationWarning": "Replaced by notices"
    },
    {
      "level": "prompt",
      "message": "  Next steps:\n    Configure the version branch to be the value of your repository branch.",
      "deprecationWarning": "Replaced by notices"
    },
    {
      "level": "success",
      "message": "Pact successfully published for consumer version 1.0.0 and provider publisher.",
      "deprecationWarning": "Replaced by notices"
    },
    {
      "level": "debug",
      "message": "  View the published pact at http://localhost:9292/pacts/provider/publisher/consumer/consumer/version/1.0.0",
      "deprecationWarning": "Replaced by notices"
    },
    {
      "level": "debug",
      "message": "  Events detected: contract_published, contract_content_changed (first time any pact published for this consumer with consumer version tagged test, first time any pact published for this consumer with consumer version tagged latest)",
      "deprecationWarning": "Replaced by notices"
    },
    {
      "level": "prompt",
      "message": "  Next steps:",
      "deprecationWarning": "Replaced by notices"
    },
    {
      "level": "prompt",
      "message": "    * Add Pact verification tests to the publisher build. See https://docs.pact.io/go/provider_verification",
      "deprecationWarning": "Replaced by notices"
    },
    {
      "level": "prompt",
      "message": "    * Configure separate publisher pact verification build and webhook to trigger it when the pact content changes. See https://docs.pact.io/go/webhooks",
      "deprecationWarning": "Replaced by notices"
    }
  ],
  "notices": [
    {
      "type": "debug",
      "text": "Created consumer version 1.0.0 with tags test, latest"
    },
    {
      "type": "prompt",
      "text": "  Next steps:\n    Configure the version branch to be the value of your repository branch."
    },
    {
      "type": "success",
      "text": "Pact successfully published for consumer version 1.0.0 and provider publisher."
    },
    {
      "type": "debug",
      "text": "  View the published pact at http://localhost:9292/pacts/provider/publisher/consumer/consumer/version/1.0.0"
    },
    {
      "type": "debug",
      "text": "  Events detected: contract_published, contract_content_changed (first time any pact published for this consumer with consumer version tagged test, first time any pact published for this consumer with consumer version tagged latest)"
    },
    {
      "type": "prompt",
      "text": "  Next steps:"
    },
    {
      "type": "prompt",
      "text": "    * Add Pact verification tests to the publisher build. See https://docs.pact.io/go/provider_verification"
    },
    {
      "type": "prompt",
      "text": "    * Configure separate publisher pact verification build and webhook to trigger it when the pact content changes. See https://docs.pact.io/go/webhooks"
    }
  ],
  "_embedded": {
    "pacticipant": {
      "name": "consumer",
      "_links": {
        "self": {
          href: `${BROKER_HOST}/pacticipants/consumer`
        }
      }
    },
    "version": {
      "number": "1.0.0",
      "_links": {
        "self": {
          "title": "Version",
          "name": "1.0.0",
          href: `${BROKER_HOST}/pacticipants/consumer/versions/1.0.0`
        }
      }
    }
  },
  "_links": {
    "pb:pacticipant": {
      "title": "Pacticipant",
      "name": "consumer",
      href: `${BROKER_HOST}/pacticipants/consumer`
    },
    "pb:pacticipant-version": {
      "title": "Pacticipant version",
      "name": "1.0.0",
      href: `${BROKER_HOST}/pacticipants/consumer/versions/1.0.0`
    },
    "pb:pacticipant-version-tags": [
      {
        "title": "Tag",
        "name": "test",
        href: `${BROKER_HOST}/pacticipants/consumer/versions/1.0.0/tags/test`
      },
      {
        "title": "Tag",
        "name": "latest",
        href: `${BROKER_HOST}/pacticipants/consumer/versions/1.0.0/tags/latest`
      }
    ],
    "pb:contracts": [
      {
        "title": "Pact",
        "name": "Pact between consumer (1.0.0) and publisher",
        href: `${BROKER_HOST}/pacts/provider/publisher/consumer/consumer/version/1.0.0`
      }
    ]
  }
}
    );
  }

  function tagPactFunction(
    req: express.Request,
    res: express.Response
  ): express.Response {
    if (
      _.isEmpty(req.params['consumer']) ||
      _.isEmpty(req.params['version']) ||
      _.isEmpty(req.params['tag'])
    ) {
      return res.sendStatus(400);
    }
    return res.sendStatus(201);
  }

  const rootResponse = (PATH: string) =>
    returnJson({
      _links: {
        self: {
          href: BROKER_HOST + PATH,
          title: 'Index',
          templated: false,
        },
        'pb:publish-pact': {
          href: `${BROKER_HOST + PATH}/pacts/provider/{provider}/consumer/{consumer}/version/{consumerApplicationVersion}`,
          title: 'Publish a pact',
          templated: true,
        },
        'pb:latest-pact-versions': {
          href: `${BROKER_HOST + PATH}/pacts/latest`,
          title: 'Latest pact version',
          templated: false,
        },
        'pb:pacticipants': {
          href: `${BROKER_HOST + PATH}/pacticipants`,
          title: 'Pacticipants',
          templated: false,
        },
        "pb:publish-contracts": {
          href: `${BROKER_HOST + PATH}/contracts/publish`,
          "title": "Publish contracts",
          "templated": false
        },
        'pb:latest-provider-pacts': {
          href: `${BROKER_HOST + PATH}/pacts/provider/{provider}/latest`,
          title: 'Latest pacts by provider',
          templated: true,
        },
        'pb:latest-provider-pacts-with-tag': {
          href: `${BROKER_HOST + PATH}/pacts/provider/{provider}/latest/{tag}`,
          title: 'Latest pacts by provider with a specified tag',
          templated: true,
        },
        'pb:webhooks': {
          href: `${BROKER_HOST + PATH}/webhooks`,
          title: 'Webhooks',
          templated: false,
        },
        curies: [
          {
            name: 'pb',
            href: `${BROKER_HOST + PATH}/doc/{rel}`,
            templated: true,
          },
        ],
      },
    });

  server.get('/somebrokenpact', returnJson({}));

  server.get(
    '/somepact',
    returnJson({
      consumer: {
        name: 'anotherclient',
      },
      provider: {
        name: 'they',
      },
    })
  );

  // Pretend to be a Pact Broker (https://github.com/bethesque/pact_broker) for integration tests
  server.put(
    '/pacts/provider/:provider/consumer/:consumer/version/:version',
    pactFunction
  );

  // Authenticated calls...
  server.put(
    '/auth/pacts/provider/:provider/consumer/:consumer/version/:version',
    auth,
    pactFunction
  );
  
  server.post(
    '/contracts/publish',
    pactFunction
  );

  server.post(
    '/auth/contracts/publish',
    auth,
    pactFunction
  );

  // Tagging
  server.put(
    '/pacticipant/:consumer/version/:version/tags/:tag',
    tagPactFunction
  );
  server.put(
    '/auth/pacticipant/:consumer/version/:version/tags/:tag',
    tagPactFunction
  );

  // Matrix
  server.get('/matrix', (req: express.Request, res: express.Response) => {
    if (
      req &&
      req.query &&
      req.query['q'] &&
      req.query['q'][0].pacticipant === 'Foo'
    ) {
      return res.json({
        summary: {
          deployable: true,
          reason: 'some text',
          unknown: 1,
        },
        matrix: [
          {
            consumer: {
              name: 'Foo',
              version: {
                number: '4',
              },
            },
            provider: {
              name: 'Bar',
              version: {
                number: '5',
              },
            },
            verificationResult: {
              verifiedAt: '2017-10-10T12:49:04+11:00',
              success: true,
            },
            pact: {
              createdAt: '2017-10-10T12:49:04+11:00',
            },
          },
        ],
      });
    }
    return res.json({
      summary: {
        deployable: false,
        reason: 'some text',
        unknown: 1,
      },
      matrix: [
        {
          consumer: {
            name: 'FooFail',
            version: {
              number: '4',
            },
          },
          provider: {
            name: 'Bar',
            version: {
              number: '5',
            },
          },
          verificationResult: {
            verifiedAt: '2017-10-10T12:49:04+11:00',
            success: false,
          },
          pact: {
            createdAt: '2017-10-10T12:49:04+11:00',
          },
        },
      ],
    });
  });

  // Get root HAL links
  server.get('/', rootResponse(""));
  server.get('/auth', rootResponse("/auth"));
  server.get('/noauth', rootResponse("/noauth"));

  // Get pacts by Provider "notfound"
  server.get(
    '/pacts/provider/notfound/latest',
    (req: express.Request, res: express.Response) => res.sendStatus(404)
  );

  // Get pacts by Provider "nolinks"
  server.get(
    '/pacts/provider/nolinks/latest',
    returnJson({
      _links: {
        self: {
          href: `${BROKER_HOST}/pacts/provider/nolinks/latest/sit4`,
          title: 'Latest pact version for the provider nolinks with tag "sit4"',
        },
        provider: {
          href: `${BROKER_HOST}/pacticipants/nolinks`,
          title: 'bobby',
        },
        pacts: [],
      },
    })
  );

  // Get pacts by Provider (all)
  server.get(
    '/pacts/provider/:provider/latest',
    returnJson({
      _links: {
        self: {
          href: `${BROKER_HOST}/pacts/provider/bobby/latest/sit4`,
          title: 'Latest pact version for the provider bobby with tag "sit4"',
        },
        provider: {
          href: `${BROKER_HOST}/pacticipants/bobby`,
          title: 'bobby',
        },
        pacts: [
          {
            href: `${BROKER_HOST}/pacts/provider/bobby/consumer/billy/version/1.0.0`,
            title: 'Pact between billy (v1.0.0) and bobby',
            name: 'billy',
          },
          {
            href: `${BROKER_HOST}/pacts/provider/bobby/consumer/someotherguy/version/1.0.0`,
            title: 'Pact between someotherguy (v1.0.0) and bobby',
            name: 'someotherguy',
          },
        ],
      },
    })
  );

  // Get pacts by Provider and Tag
  server.get(
    '/pacts/provider/:provider/latest/:tag',
    returnJson({
      _links: {
        self: {
          href: 'https://test.pact.dius.com.au/pacts/provider/notfound/latest',
          title: 'Latest pact version for the provider bobby',
        },
        provider: {
          href: 'https://test.pact.dius.com.au/pacticipant/bobby',
          title: 'bobby',
        },
        pacts: [
          {
            href: 'https://test.pact.dius.com.au/pacts/provider/bobby/consumer/billy/version/1.0.0',
            title: 'Pact between billy (v1.0.0) and bobby',
            name: 'billy',
          },
          {
            href: 'https://test.pact.dius.com.au/pacts/provider/bobby/consumer/someotherguy/version/1.0.0',
            title: 'Pact between someotherguy (v1.0.0) and bobby',
            name: 'someotherguy',
          },
        ],
      },
    })
  );

    server.post(
    '/contracts/publish',
    auth,
    pactFunction
  );

  server.get(
    '/noauth/pacts/provider/they/consumer/me/latest',
    returnJson({
      consumer: {
        name: 'me',
      },
      provider: {
        name: 'they',
      },
      interactions: [
        {
          description: 'Provider state success',
          providerState: 'There is a greeting',
          request: {
            method: 'GET',
            path: '/somestate',
          },
          response: {
            status: 200,
            headers: {},
            body: {
              greeting: 'State data!',
            },
          },
        },
      ],
      metadata: {
        pactSpecificationVersion: '2.0.0',
      },
      updatedAt: '2016-05-15T00:09:33+00:00',
      createdAt: '2016-05-15T00:09:06+00:00',
      _links: {
        self: {
          title: 'Pact',
          name: 'Pact between me (v1.0.0) and they',
          href: `${BROKER_HOST}/pacts/provider/they/consumer/me/version/1.0.0`,
        },
        'pb:consumer': {
          title: 'Consumer',
          name: 'me',
          href: `${BROKER_HOST}/pacticipants/me`,
        },
        'pb:provider': {
          title: 'Provider',
          name: 'they',
          href: `${BROKER_HOST}/pacticipants/they`,
        },
        'pb:latest-pact-version': {
          title: 'Pact',
          name: 'Latest version of this pact',
          href: `${BROKER_HOST}/pacts/provider/they/consumer/me/latest`,
        },
        'pb:previous-distinct': {
          title: 'Pact',
          name: 'Previous distinct version of this pact',
          href: `${BROKER_HOST}/pacts/provider/they/consumer/me/version/1.0.0/previous-distinct`,
        },
        'pb:diff-previous-distinct': {
          title: 'Diff',
          name: 'Diff with previous distinct version of this pact',
          href: `${BROKER_HOST}/pacts/provider/they/consumer/me/version/1.0.0/diff/previous-distinct`,
        },
        'pb:pact-webhooks': {
          title: 'Webhooks for the pact between me and they',
          href: `${BROKER_HOST}/webhooks/provider/they/consumer/me`,
        },
        'pb:tag-prod-version': {
          title: 'Tag this version as "production"',
          href: `${BROKER_HOST}/pacticipants/me/versions/1.0.0/tags/prod`,
        },
        'pb:tag-version': {
          title: 'Tag version',
          href: `${BROKER_HOST}/pacticipants/me/versions/1.0.0/tags/{tag}`,
        },
        curies: [
          {
            name: 'pb',
            href: `${BROKER_HOST}/doc/{rel}`,
            templated: true,
          },
        ],
      },
    })
  );

  server.get(
    '/noauth/pacts/provider/they/consumer/anotherclient/latest',
    returnJson({
      consumer: {
        name: 'anotherclient',
      },
      provider: {
        name: 'they',
      },
      interactions: [
        {
          description: 'Provider state success',
          providerState: 'There is a greeting',
          request: {
            method: 'GET',
            path: '/somestate',
          },
          response: {
            status: 200,
            headers: {},
            body: {
              greeting: 'State data!',
            },
          },
        },
      ],
      metadata: {
        pactSpecificationVersion: '2.0.0',
      },
      updatedAt: '2016-05-15T00:09:33+00:00',
      createdAt: '2016-05-15T00:09:06+00:00',
      _links: {
        self: {
          title: 'Pact',
          name: 'Pact between me (v1.0.0) and they',
          href: `${BROKER_HOST}/pacts/provider/they/consumer/me/version/1.0.0`,
        },
        'pb:consumer': {
          title: 'Consumer',
          name: 'anotherclient',
          href: `${BROKER_HOST}/pacticipants/me`,
        },
        'pb:provider': {
          title: 'Provider',
          name: 'they',
          href: `${BROKER_HOST}/pacticipants/they`,
        },
        'pb:latest-pact-version': {
          title: 'Pact',
          name: 'Latest version of this pact',
          href: `${BROKER_HOST}/pacts/provider/they/consumer/me/latest`,
        },
        'pb:previous-distinct': {
          title: 'Pact',
          name: 'Previous distinct version of this pact',
          href: `${BROKER_HOST}/pacts/provider/they/consumer/me/version/1.0.0/previous-distinct`,
        },
        'pb:diff-previous-distinct': {
          title: 'Diff',
          name: 'Diff with previous distinct version of this pact',
          href: `${BROKER_HOST}/pacts/provider/they/consumer/me/version/1.0.0/diff/previous-distinct`,
        },
        'pb:pact-webhooks': {
          title: 'Webhooks for the pact between me and they',
          href: `${BROKER_HOST}/webhooks/provider/they/consumer/me`,
        },
        'pb:tag-prod-version': {
          title: 'Tag this version as "production"',
          href: `${BROKER_HOST}/pacticipants/me/versions/1.0.0/tags/prod`,
        },
        'pb:tag-version': {
          title: 'Tag version',
          href: `${BROKER_HOST}/pacticipants/me/versions/1.0.0/tags/{tag}`,
        },
        curies: [
          {
            name: 'pb',
            href: `${BROKER_HOST}/doc/{rel}`,
            templated: true,
          },
        ],
      },
    })
  );

  let s: http.Server;
  return new Promise<void>((resolve) => {
    s = server.listen(port, () => resolve());
  }).then(() => s);
};
