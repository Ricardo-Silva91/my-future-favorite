module.exports = {
    pages: {
      index: {
        entry: 'src/main.js',
        title: 'My Future Favorite',
      },
    },
    css: {
      loaderOptions: {
          sass: {
            additionalData: `
                  @import "@/assets/styles/_variables.scss";
              `
          }
      }
  }
}