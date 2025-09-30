import { UserConfig } from "@hey-api/openapi-ts";

export type Patch = Required<NonNullable<NonNullable<UserConfig["parser"]>["patch"]>>;

export type SchemaPatch = Patch["schemas"][string];
