<center>
    <h1>Rust Maps API</h1>
    <a href="https://www.npmjs.com/package/@maxijonson/rust-maps-api">
        <img src="https://img.shields.io/npm/v/%40maxijonson%2Frust-maps-api?color=green" alt="NPM Version" />
    </a>
    <br />
    Unofficial Node.js clients for the Rust Maps API. 
    <br />
    All types and clients are automatically generated from <a href="https://api.rustmaps.com/swagger/v4-public/swagger.json">Rust Maps' OpenAPI spec</a> using <a href="https://heyapi.dev/">Hey API</a>.
</center>

## ⚠️ Unstable - Use at your own risk

This project relies on [Rust Maps' OpenAPI spec](https://api.rustmaps.com/swagger/v4-public/swagger.json) to automatically generate clients. However, as of October 2025, the spec currently has a lot of issues, making the generated clients unreliable. **Use at your own risk.**

Examples of issues include the following. Note that these are just examples from my own usage in projects, and there may be many more.

- `MonumentTypes` and `BiomeTypes` are typed as `integer` instead of `string`. A patch has been configured in this project to fix this.
- `Search.searchRaw` request schema has a lot of incorrectly typed fields, making it practically unusable. `largeMonuments` is typed as `MonumentTypes`, though not all `MonumentTypes` are valid values for this field.

## Installation

```bash
npm install @maxijonson/rust-maps-api
```

## Usage

Import the client classes you need from the package. Currently, you can use one of the following clients:

- `Search`
- `Misc`
- `Maps`
- `SubscriptionRequired`
- `MapsUpload`

```ts
// 1. Import the needed client classes
import { Search, Misc, Maps, SubscriptionRequired, MapsUpload } from "@maxijonson/rust-maps-api";

// 2. Use the clients
// Example: Search for maps with a size of exactly 4000
const { data, error } = await Search.searchRaw({
  query: {
    page: 0,
    customMaps: false,
  },
  body: {
    searchQuery: {
      size: {
        min: 4000,
        max: 4000,
      },
    },
  },
  auth: process.env.RUST_MAPS_API_KEY,
});
console.log(data, error);
```

## Documentation

See [Rust Maps API documentation](https://api.rustmaps.com/swagger).

## Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/maxijonson/rust-maps-api.git
cd rust-maps-api
npm install
```

To generate the clients, run:

```bash
npm run generate
```

_(Only for maintainers)_ Automatically update the clients and publish them to NPM with one command:

```bash
# This bumps the version, builds the project, pushes to git and publishes to NPM
npm version patch # or minor or major
```

## Contributing

Apart from configuration, everything is automatically generated from the OpenAPI spec. No manual changes are made to the generated code. If you find the generated clients are outdated, you can let me know and I'll run the generation script again and publish them to NPM. This project doesn't do anything fancy that you wouldn't be able to do yourself with Hey API.

If you do contribute however, **please don't waste your time updating the generated code**, as it will be overwritten when I publish your changes to NPM. If something is wrong in the generated code, please try to fix it via the [`openapi-ts.config.ts`](./openapi-ts.config.ts) configuration file, not in the generated code.

Though I prefer you not include changes to generated code in your pull requests, you may still do. However, just know that if your PR is merged, any changes to generated code will automatically be overwritten the next time I publish to NPM.
