module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  globalSetup: "jest-preset-angular/global-setup",
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/main.ts",
    "!src/app/**/*.module.ts",
    "src/**/app-routing.module.ts",
  ],
};
