import type { SchemaPatch } from "./patches.types";

// RustMaps API incorrectly defines this enum as an integer, but it's actually a string enum
export const biomeTypesSchemaPatch: SchemaPatch = (schema) => {
  if (schema.type === "string") return;
  schema.type = "string";
  schema.enum = schema["x-enumNames"];
};
