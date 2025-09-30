import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "https://api.rustmaps.com/swagger/v4-public/swagger.json",
  output: {
    path: "src/client",
    indexFile: false,
    format: "prettier",
  },
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
      asClass: true,
      methodNameBuilder(operation) {
        const tags: string[] = [];
        let name = "";

        if ("name" in operation) {
          name = operation.name;
        } else {
          name = operation.id;
        }

        if ("tags" in operation) {
          tags.push(...(operation.tags ?? []));
        }

        name = name.replace("rustMapsApiFeaturesPublicApi", "");
        name = name.replace("RustMapsApiFeaturesPublicApi", "");

        for (const tag of tags) {
          if (name.toLowerCase().startsWith(tag.toLowerCase())) {
            name = name.substring(tag.length);
          }
        }

        return name.charAt(0).toLowerCase() + name.slice(1);
      },
    },
  ],
});
