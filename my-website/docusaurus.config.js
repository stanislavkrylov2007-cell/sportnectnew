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
            id: 'sportnect',
            spec: 'openapi.yaml',
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
      logo: {
        alt: 'Sportnect Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Документация',
        },
        {
          to: '/docs/api/sportnect',
          label: 'API',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Sportnect`,
    },
  },
};

module.exports = config;