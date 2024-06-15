import type { Config } from "jest"

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  modulePaths: ["<rootDir>/node_modules/**/*", "<rootDir>/src/**/*"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "@modules/(.*)": "<rootDir>/node_modules/$1",
    "@src/(.*)": "<rootDir>/src/$1",
    "@utils/(.*)": "<rootDir>/src/utils/$1",
    "src/(.*)": "<rootDir>/src/$1"
  },
  verbose: true,
  transform: {},
  extensionsToTreatAsEsm: [".ts"],
};

export default config;
