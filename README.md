# MovieQL

<br />
<div align="center">
  <a href="https://github.com/Spelchure/movieql">
    <img src="assets/graphql-logo.png" alt="Logo" width="100" height="100">
  </a>

  <h3 align="center">MovieQL</h3>
    Movie catalog that is powered with GraphQL.
  <p align="center">
    <br />
  </p>

## ![Default workflow](https://github.com/Spelchure/movieql/actions/workflows/default.yml/badge.svg)

</div>

---

:movie_camera: This is an example project that demonstrates the usage of Apollo GraphQL with
Typescript, Prisma and ExpressJS.

## :pencil2: Features

- :pushpin: Simple resolver with a **mutation** and **query**.
- :paperclip: Integration test using `Jest` for the resolver.
- :hammer: Basic unit test using `Jest` for the configuration.
- :file_folder: MongoDB behind `Prisma`.
- :green_heart: Basic pipeline with Github workflows.
- :black_nib: Code first with `type-graphql`
- :dolphin: Quick setup of the Mongo DB with `docker compose`.

---

## :rocket: Quickstart

```sh
# Install dependencies
npm install
# Start the DB using docker compose
docker compose up -d
# Start the application in development mode
npm run dev
```

---

## :wrench: Scripts

### Building

```sh
# Build
npm run build
# Clean
npm run clean
```

### Development

`npm run dev`

### Testing

#### Unit tests

`npm run test`

#### Integration tests

`npm run test:integration`

### Linting

`npm run lint`

---

:warning: _Disclaimer: This is not production-ready code and before going to production
some arrangements should be made._