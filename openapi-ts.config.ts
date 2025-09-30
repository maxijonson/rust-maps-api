import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "https://api.rustmaps.com/swagger/v4-public/swagger.json",
  parser: {
    patch: {
      schemas: {
        // RustMaps API incorrectly defines this enum as an integer, but it's actually a string enum
        MonumentTypes: (schema) => {
          if (schema.type === "string") {
            return schema;
          }
          schema.type = "string";
          schema.enum = schema["x-enumNames"];
          return schema;
        },
        // RustMaps API incorrectly defines this enum as an integer, but it's actually a string enum
        BiomeTypes: (schema) => {
          if (schema.type === "string") {
            return schema;
          }
          schema.type = "string";
          schema.enum = schema["x-enumNames"];
          return schema;
        },
      },
    },
  },
  output: {
    path: "src/client",
    indexFile: false,
    format: "prettier",
  },
  plugins: [
    {
      name: "@hey-api/typescript",
      enums: {
        case: "PascalCase",
        enabled: true,
      },
    },
    {
      name: "@hey-api/sdk",
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
