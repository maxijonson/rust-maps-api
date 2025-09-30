import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "https://api.rustmaps.com/swagger/v4-public/swagger.json",
  output: "src/client",
  plugins: [
    {
      name: "@hey-api/client-axios",
    },
    {
      name: "zod",
      case: "PascalCase",
      definitions(name) {
        return name;
      },
      types: {
        infer: {
          case: "PascalCase",
          enabled: true,
        },
      },
    },
    {
      name: "@hey-api/sdk",
      validator: true,
    },
  ],
});
