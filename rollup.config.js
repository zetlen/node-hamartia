import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";

/**
 * @type {import('rollup').RollupOptions}
 */
const rollupConfig = {
  input: "src/index.ts",
  // instead of relying on directory structure, use package.json for
  // leaving explicitly declared dependencies out of the bundle
  external: Object.keys(pkg.dependencies || {}),
  plugins: [
    typescript(), // so Rollup can convert TypeScript to JavaScript
  ],
  output: [
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "es", externalLiveBindings: false },
  ],
};

export default rollupConfig;
