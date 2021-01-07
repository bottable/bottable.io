module.exports = {
  displayName: 'queue',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': [
      'babel-jest',
      { cwd: __dirname, configFile: './babel-jest.config.json' },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/queue',
};
