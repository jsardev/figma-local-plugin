const { readFileSync } = require("fs");

function fixTailwindInjectionPlugin() {
  return {
    name: "fix-tailwind-injection-plugin",
    setup(build) {
      // build.onLoad({ filter: /output\.css$/ }, async (args) => {
      build.onLoad({ filter: /output\.js$/ }, async (args) => {
        const contents = readFileSync(args.path, "utf8");

        const modifiedContents = contents
          .replaceAll("\\2c ", "\\\\,")
          .replaceAll("\\[", "\\\\[")
          .replaceAll("\\]", "\\\\]")
          .replaceAll("\\%", "\\\\%")
          .replaceAll("\\/", "\\\\/");

        return { contents: modifiedContents, loader: "tsx" };
      });
    },
  };
}

/**
 *
 * @param {import('esbuild').BuildOptions} buildOptions
 * @returns  {import('esbuild').BuildOptions}
 */
module.exports = function (buildOptions) {
  return {
    ...buildOptions,
    plugins: [...buildOptions.plugins, fixTailwindInjectionPlugin()],
  };
};
