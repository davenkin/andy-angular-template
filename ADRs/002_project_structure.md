# Project structure

## Context

A consistent project structure makes the whole application easy to understand.

## Decision

We try to make the project structure as flat as possible while at the same time ensure all folders are in an organised manner.

## Implementation

At the top level under `src` folder, there are 4 sub folders:

- `common`: contains everything that are common to the whole application, such as common APIs, shared components and global styles.
- `console`: the entry folder for all console pages, console pages are pages that require users be authenticated to access
- `environments`: contains configuration files for various environments
- `public`: contains all publicly accessed pages, this `src/public` folder is different from `public` folder under the project root in that the former one can contain Angular files while the latter one should only contain static files that get copied as is to the final distribution after build.

Below is the detailed explanation of project structure:

- `common`: contains commonly used files across the whole application
  - `api`: common APIs
  - `component`: shared Angular components
  - `config`: application level configuration files, such as authentication, error, i18n and routing
  - `directive`: shared Angular directives
  - `layout`: contains components for page layout structure
  - `model`: common models shared across the whole application
  - `root`: the Angular root component
  - `service`: common services used across the whole application, such as confirmation, dialog and spinner etc.
  - `style`: global/shared styles, also contains PrimeNG preset customization
  - `utils`: common utils
- `console`: contains all console pages, its first level subfolders should be based on domain/business, such as `src/console/device`and `src/console/member`
- `environments`: environments configuration files
- `public`: contains all publicly accessed pages, its first level subfolders should be based on domain/business, such as `src/public/home-page` and `src/public/pricing-page`
