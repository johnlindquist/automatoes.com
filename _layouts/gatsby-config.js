module.exports = {
  siteMetadata: {
    title: `🍅 automatoes.com`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          `gatsby-remark-prismjs`,
          "gatsby-remark-double-brackets-link",
          "gatsby-remark-double-parenthesis-link",
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 561,
            },
          },
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false,
            },
          },
        ],
      },
    },
    {
      mdxOtherwiseConfigured: true,
      resolve: `gatsby-theme-garden`,
      options: {
        rootNote: "/index",
        contentPath: `${__dirname}/..`,
        ignore: [
          "**/_layouts/**",
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
