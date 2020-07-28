module.exports = {
  siteMetadata: {
    title: `🍅 automatoes.com`,
  },
  plugins: [
    {
      resolve: `gatsby-theme-garden`,
      options: {
        rootNote: "/index",
        contentPath: `${__dirname}/..`,
        ignore: [
          "**/_layouts/static/**",
          "**/_layouts/public/**",
          "**/_layouts/node_modules/**",
          "**/_layouts/.cache/**",
          "**/.git/**",
          "**/.github/**",
          "**/.vscode/**",
        ],
      },
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./favicon.png",
      },
    },
  ],
}
