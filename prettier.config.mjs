/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 90,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/global.css',
};
