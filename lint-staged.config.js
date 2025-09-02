module.exports = {
  '*.{js,jsx,ts,tsx,json,md,yml,yaml}': ['prettier --check', 'eslint'],
  '*.{css,scss,html}': ['prettier --check'],
};
