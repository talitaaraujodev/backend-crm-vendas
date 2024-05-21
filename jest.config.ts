import { JestConfigWithTsJest } from "ts-jest/dist/types";

const config: JestConfigWithTsJest = {
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: "ts-jest",
  verbose: true,
  transform: {
    "^.+\\.ts?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};

export default config;
