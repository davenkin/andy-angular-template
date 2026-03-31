## Introduction

This is a sample Angular project with the following features:

- Contains both public pages and authenticated pages, refer to [page layout structure](./ADRs/008_page_layout_structure.md) for more detail
- Use [PrimeNG](https://primeng.org/) as the component library
- Use [PrimeNG theme](https://primeng.org/theming) to customize the UI style
- Use PrimeNG's [primeicons](https://github.com/primefaces/primeicons) for icons, together with customized SVG icons using `<app-icon>` component
- Use [ngx-translate](https://github.com/ngx-translate/core) for i18n
- Use [keycloak-js](https://github.com/keycloak/keycloak-js) for integration with Keycloak server
- Use [ngx-spinner](https://github.com/Napster2210/ngx-spinner) for displaying loading spinners
- Use [Eslint](https://eslint.org/) for finding bugs
- Use [Prettier](https://prettier.io/) to format code
- Use [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/lint-staged/lint-staged) to run Eslint and Prettier
- A consistent [project structure](./ADRs/002_project_structure.md)
- A consistent [naming convention](./ADRs/003_naming_convention.md)
- A consistent [CSS strategy](./ADRs/006_css_strategy.md)
- A consistent [page layout structure](./ADRs/008_page_layout_structure.md)
- A consistent [API calling strategy](./ADRs/005_how_to_call_apis.md)

## Tech stack

- Angular 21
- PrimeNG 21

## Local run

1. Make sure you have Node 22+ installed
2. Run `npm ci` to download all required dependencies
3. Copy `src/environments/environment.dev.ts` to `src/environments/environment.local.ts` and change the content according to your need
4. Finish all steps in [Local keycloak setup](#local-keycloak-setup)
5. Run `npm start` to start the application locally
6. Open your browser and navigate to [http://localhost:4200/](http://localhost:4200/), the application will automatically reload whenever you modify source files

## Build

To build the project run:

```
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Docker

To build a docker image, first build the whole project:

```
npm run build
```

Then create Docker image:

```
docker build -t andy-angular-template:0.0.1 .
```

Now you can run the application using Docker:

```
docker run -d -p 4200:8080 andy-angular-template:0.0.1
```

## Running unit tests

```
npm test
```

## Architecture Decision Records (ADRs)

This project uses [Architecture Decision Records (ADRs)](https://adr.github.io/) to document important architectural decisions. Each ADR is stored in the `ADRs` directory and follows a specific format.

## Local keycloak setup

This application integrates with Keycloak for user authentication, please follow the below steps to set up a local Keycloak server:

- Run `./start-docker-compose.sh` to start local keycloak server
- Open `http://localhost:8765` use account `admin/admin` to login
- Create a realm named `test-realm`
- In `test-realm`, create a client named `test-client`:
  - Enable `Standard flow` for `Authentication flow`
  - Set `Valid redirect URIs` to `http://localhost:4200/*`
  - Set `Web origins` to `*`
- In `test-realm`, create a user named `test-user` and set password credentials for it
- Now you are ready to open `http://localhost:4200` and login using Keycloak user
- Run `stop-docker-compose.sh` to stop docker, the next time you run `./start-docker-compose.sh` the previous `test-realm`, `test-client` and `test-user` will stay
