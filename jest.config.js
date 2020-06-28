module.exports = {
  automock: false,
  roots: [
    "./",
  ],
  testMatch: [
    "**/tests/**/*.+(ts|js)",
  ],
  moduleDirectories: [
    "./",
    "node_modules",
  ],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
    },
  },
  transform: {
    "^.+\\.(ts)$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)": "<rootDir>/$1"
  },
};
