const config = {
  title: 'Sportnect Documentation',
  tagline: 'Документация проекта Sportnect',
  favicon: 'img/favicon.ico',

  url: 'https://stanislavkrylov2007-cell.github.io',
  baseUrl: '/sportnectnew/',
  organizationName: 'stanislavkrylov2007-cell',
  projectName: 'sportnectnew',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'ru',
    locales: ['ru'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/stanislavkrylov2007-cell/sportnectnew/tree/main/',
          remarkPlugins: [require('@akebifiky/remark-simple-plantuml')],
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
    [
      'redocusaurus',
      {
        specs: [
          {
            spec: 'openapi.yaml',
            route: '/api/',
          },
        ],
        theme: {
          primaryColor: '#1890ff',
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Sportnect',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Документация',
        },
        {
          to: '/api/',
          label: 'API',
          position: 'left',
        },
      ],
    },
  },
};

module.exports = config;