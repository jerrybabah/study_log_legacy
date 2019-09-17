module.exports = {
  lintOnSave: false,
  outputDir: '../backend/public',
  assetsDir: 'static',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
};
