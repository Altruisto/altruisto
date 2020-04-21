const withSass = require('@zeit/next-sass')
const withPWA = require('next-pwa')


module.exports = withPWA(withSass({
  pwa: {
    dest: 'public',
  },
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
      '/welcome': {
        page: '/welcome'
      },
    }
  }
}));
