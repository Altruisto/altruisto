const withSass = require('@zeit/next-sass')

module.exports = withSass({
  exportPathMap: async function () {
    return {
      '/terms-of-service': {
        page: '/terms-of-service'
      },
      '/privacy-policy': {
        page: '/privacy-policy'
      },
      '/waiting': {
        page: '/waiting'
      },
    }
  }
})