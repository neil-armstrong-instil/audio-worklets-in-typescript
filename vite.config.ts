import {defineConfig} from "vite";
import svgrPlugin from "vite-plugin-svgr";
import {swcReactRefresh} from "vite-plugin-swc-react-refresh";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 3000
  },
  build: {
    outDir: "build"
  },
  esbuild: {
    jsx: "automatic" // Recommended here https://www.npmjs.com/package/vite-plugin-swc-react-refresh
  },
  plugins: [
    swcReactRefresh(),
    tsconfigPaths(),
    svgrPlugin({
      svgrOptions: {
        icon: false,
        dimensions: true
      }
    })
  ]
});
