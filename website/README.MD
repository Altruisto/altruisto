# Altruisto website

## Environment

- a modern [Node](https://nodejs.org/en/) version with npm installed

## Preconditions

Install npm packages before running any application scripts:

```
npm install
```

## Build

```
npm run build
```

## Running locally

```
npm run dev
```

Mind the next.js part (`/pages`) will hot-reload after applied changes, landing page (`/custom`) needs to be rebuild with `npm run build:custom`.

## Linting

For best developer experience and consistent formatting use [Prettier](https://prettier.io/) and [EditorConfig](https://editorconfig.org/)

## Deploy

```
npm run deploy
```

This script will create and push a deploy branch to [Altruisto/homepage repo](https://github.com/Altruisto/homepage).
When merged to [Altruisto/homepage repo](https://github.com/Altruisto/homepage) master branch, changes are deployed to staging environment.
