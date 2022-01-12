module.exports = function babel(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".js", ".jsx", ".es", ".es6", ".mjs", ".ts", ".tsx"],
          root: ["./src"],
        },
      ],
      ["styled-components", { ssr: true }],
    ],
  };
};
