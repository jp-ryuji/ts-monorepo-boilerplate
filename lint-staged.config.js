module.exports = {
  '*.{js,jsx,ts,tsx,json,md,yml,yaml}': [
    'biome check --no-errors-on-unmatched',
  ],
  '*.{css,scss,html}': ['biome check --no-errors-on-unmatched'],
};
