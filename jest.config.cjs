module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: [
	"src/**/*.{js,jsx}",
	"!src/**/*.d.ts",
  ],
  coveragePathIgnorePatterns: [],
  setupFilesAfterEnv: ["./config/setupTests.cjs"],
  testEnvironment: "jsdom",
  transform: {
	"^.+\\.(ts|js|tsx|jsx)$": "@swc/jest",
	".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform",
	"^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "<rootDir>/config/fileTransform.cjs",
  },
  transformIgnorePatterns: [
	"^.+\\.module\\.(css|sass|scss)$",
	"node_modules/(?!(monaco-editor|nanoid)/)"
  ],
  modulePaths: ["<rootDir>/src"],
  moduleNameMapper: {
	"^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
	"^monaco-editor\\/esm\\/vs\\/editor\\/editor.worker\\?worker$": "<rootDir>/node_modules/monaco-editor/esm/vs/editor/editor.worker.js",
	"^monaco-editor\\/esm\\/vs\\/language\\/json\\/json.worker\\?worker$": "<rootDir>/node_modules/monaco-editor/esm/vs/language/json/json.worker.js",
	"^monaco-editor\\/esm\\/vs\\/language\\/css\\/css.worker\\?worker$": "<rootDir>/node_modules/monaco-editor/esm/vs/language/css/css.worker.js",
	"^monaco-editor\\/esm\\/vs\\/language\\/html\\/html.worker\\?worker$": "<rootDir>/node_modules/monaco-editor/esm/vs/language/html/html.worker.js",
	"^monaco-editor\\/esm\\/vs\\/language\\/typescript\\/ts.worker\\?worker$": "<rootDir>/node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js",
	"^monaco-editor$": "<rootDir>/node_modules/monaco-editor/esm/vs/editor/editor.api.js"
  },
  moduleFileExtensions: [
	// Place tsx and ts to beginning as suggestion from Jest team
	// https://jestjs.io/docs/configuration#modulefileextensions-arraystring
	"tsx",
	"ts",
	"web.js",
	"js",
	"web.ts",
	"web.tsx",
	"json",
	"web.jsx",
	"jsx",
	"node",
  ],
  resetMocks: true,
};