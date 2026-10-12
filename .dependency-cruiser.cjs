module.exports = {
  forbidden: [
    { name: 'shared-to-upper-layers', severity: 'error', from: { path: '^src/shared' }, to: { path: '^src/(content|features|entities|pages|app)' } },
    { name: 'content-to-upper-layers', severity: 'error', from: { path: '^src/content' }, to: { path: '^src/(features|entities|pages|app)' } },
    { name: 'ui-to-redux-internals', severity: 'error', from: { path: '/(ui|components)/' }, to: { path: '/(model|store)/|@reduxjs/toolkit|react-redux' } },
    { name: 'no-cycles', severity: 'error', from: {}, to: { circular: true } }
  ],
  options: { doNotFollow: { path: 'node_modules' }, tsPreCompilationDeps: true, enhancedResolveOptions: { extensions: ['.ts','.tsx','.js','.jsx','.json'] } }
};
