/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest, @shelf/jest-mongodb",
  moduleFileExtensions: ["js", "ts"],
  rootDir: ".",
  testEnvironment: "node",
};

export default config;
