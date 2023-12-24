module.exports = {
  extends: '@vue/tsconfig/tsconfig.web.json',
  include: ['env.d.ts', 'src/**/*', 'src/**/*.vue', 'src/**/*.ts', 'types/auto-imports.d.ts'],
  compilerOptions: {
    // verbatimModuleSyntax: true, //- 中括号进行属性访问
    strict: true,
    forceConsistentCasingInFileNames: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    noFallthroughCasesInSwitch: true,
    ignoreDeprecations: '5.0',
    baseUrl: '.',
    paths: {
      '@/*': ['./src/*'],
      'stores/*': ['./src/stores/*'],
      'utils/*': ['./src/utils/*'],
      'commonComponent/*': ['./src/components/template_1/*'],
      'static_data/*': ['./src/assets/data/template_1/*'],
      'pages/*': ['./src/pages/template_1/*'],
      'footer/*': ['./src/components/template_1/Footer/*'],
      'header/*': ['./src/components/template_1/Header/*'],
      'sideBar/*': ['./src/components/template_1/SideBar/*'],
    },
    types: ['vite/client'],
    lib: ['es2017', 'dom', 'es2018', 'es2020', 'es2021'],
  },
};
