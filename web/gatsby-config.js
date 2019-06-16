module.exports = {
  siteMetadata: {
    title: `Audio Tag Editor`,
    description: `A simple tag editor for audio files.`,
    author: `@dantehemerson`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `images`,
    //     path: `${__dirname}/src/images`,
    //   },
    // },
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`
        //  ? icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      }
    }
  ]
}
