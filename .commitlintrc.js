async function getConfig() {
  const {
    default: {
      utils: {getProjects},
    },
  } = await import('@commitlint/config-nx-scopes');

  return {
    extends: [
      '@commitlint/config-nx-scopes',
      '@commitlint/config-conventional'
    ],
    rules: {
      'scope-enum': async (ctx) => [
        2,
        'always',
        [
          ...(await getProjects(ctx)),
        ],
        'deliverables',
        'documentation'
      ],
    },
  };
}

module.exports = getConfig();
