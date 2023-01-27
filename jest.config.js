const {pathsToModuleNameMapper} = require("ts-jest");
const {compilerOptions} = require("./tsconfig");

module.exports = {
  resetMocks: true,
  preset: "ts-jest/presets/js-with-ts",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/*.test.[jt](s|sx)"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass|svg)$": "identity-obj-proxy",
    ...pathsToModuleNameMapper(compilerOptions.paths, {prefix: "<rootDir>/"})
  },
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect"
  ],
  globals: {
    "ts-jest": {
      isolatedModules: true
    }
  },
  testEnvironment: "jest-environment-jsdom"
};
