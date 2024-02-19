const config = {
    branches: ['main'],
    plugins: [
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      ['@semantic-release/exec', {
        prepareCmd: 'helm package --version ${nextRelease.version} .'
      }],
      ['@semantic-release/git', {
        'assets': [],
        'message': 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }],
      ['@semantic-release/github', {
        assets: ['*.tgz'],
      }]
    ]
  };
    
  module.exports = config;