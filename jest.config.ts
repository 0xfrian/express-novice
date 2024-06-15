import type { Config } from "jest";


const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "@utils/(.*)": "<rootDir>/src/utils/$1"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  extensionsToTreatAsEsm: [".ts"],
  // transform: {},
  transform: {
    "^.+\\.ts?$": ["ts-jest", { useESM: true, }],
  },
  verbose: true,
}

export default config;
