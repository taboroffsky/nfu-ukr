module.exports = {
    locales: ['ua', 'en'], // Array with the languages that you want to use
    defaultLocale: 'ua', // Default language of your website
    localeDetection: false,
    pages: {
        '*': ['common', 'tokens'], // Namespaces that you want to import per page (we stick to one namespace for all the application in this tutorial)
        '/': ['common', 'tokens']
    },
  };