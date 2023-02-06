/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "@noble/curves/(.*)": "<rootDir>/node_modules/@noble/curves/$1"
  }
};