/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    // @tastic/core exposes a "browser" export condition pointing at raw .ts
    // source. jsdom activates that condition by default, which sends Jest to
    // unbuilt TS in node_modules instead of the compiled dist output.
    customExportConditions: []
  },
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
          lib: ['ES2020', 'DOM'],
          module: 'CommonJS',
          moduleResolution: 'node',
          ignoreDeprecations: '5.0',
          types: ['jest', 'node']
        }
      }
    ]
  },
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/.claude/worktrees/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs']
}
