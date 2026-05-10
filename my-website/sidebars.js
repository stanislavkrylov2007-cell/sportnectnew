// @ts-check

/**
 * Creating a sidebar enables you to:
 * - create an ordered group of docs
 * - render a sidebar for each doc of that group
 * - provide next/previous navigation
 *
 * The sidebars can be generated from the filesystem, or explicitly defined here.
 *
 * Create as many sidebars as you want.
 *
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    'index',
    {
      type: 'category',
      label: 'Продукт',
      items: [
        'product/description',
      ],
    },
     {
      type: 'category',
      label: 'Требования',
      items: [
        'requirements/functional',
        'requirements/nonfunctional',
      ],
    },
    {
      type: 'category',
      label: 'Архитектура и технологии',
      items: [
        'modeling/bpmn',
        'modeling/openapi',
        'modeling/usecase',
        'modeling/sequence',
        'modeling/erd',
        'modeling/wireframes',
        'modeling/data-storage',
        'modeling/platformization'
      ],
    },
  ],
};

export default sidebars;