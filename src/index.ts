export * from "./client";

// Temporary workaround for the BodyInit type missing in Node 22.x
// https://github.com/hey-api/openapi-ts/issues/2539#issuecomment-3257727764
declare global {
  type BodyInit = ReadableStream;
}
