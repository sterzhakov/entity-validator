module.exports = {
  plugins: ['@babel/plugin-transform-flow-strip-types'],
  presets: [
    ['@babel/preset-env', {
      targets: {
        node: true,
      },
      modules: false
    }]
  ],
};
