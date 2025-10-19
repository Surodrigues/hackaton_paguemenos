// Next.js 15 requires PostCSS plugins to be specified as strings.
// Use @tailwindcss/postcss if available, otherwise fallback to 'tailwindcss'.
let tailwindPluginName = 'tailwindcss'
try {
  require.resolve('@tailwindcss/postcss')
  tailwindPluginName = '@tailwindcss/postcss'
} catch (e) {
  tailwindPluginName = 'tailwindcss'
}

module.exports = {
  plugins: [
    tailwindPluginName,
    'autoprefixer',
  ],
}
