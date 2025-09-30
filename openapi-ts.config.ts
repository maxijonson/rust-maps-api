import { defineConfig } from "@hey-api/openapi-ts";
import { biomeTypesSchemaPatch } from "./patches/biome-types.patch";
import { monumentTypesSchemaPatch } from "./patches/monument-types.patch";

export default defineConfig({
  input: "https://api.rustmaps.com/swagger/v4-public/swagger.json",
  parser: {
    patch: {
      schemas: {
        MonumentTypes: monumentTypesSchemaPatch,
        BiomeTypes: biomeTypesSchemaPatch,
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
