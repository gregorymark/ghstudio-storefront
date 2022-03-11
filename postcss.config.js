const postcssImport = require(`postcss-import`)
const postcssPresetEnv = require(`postcss-preset-env`)

module.exports = () => ({
  plugins: [
    postcssImport,
    postcssPresetEnv({
      features: {
        'nesting-rules': true,
        'custom-media-queries': true
      }
    }),
  ]
})