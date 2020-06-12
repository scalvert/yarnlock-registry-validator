'use strict';

const lockfile = require('@yarnpkg/lockfile');
const URL = require('whatwg-url').URL;

module.exports = function validate(lockfileContents, registry = '') {
  const parsed = lockfile.parse(lockfileContents);

  const registries = new Set();
  for (const [name, meta] of Object.entries(parsed.object)) {
    const url = new URL(meta.resolved);

    if (!registries.has(url.origin)) {
      registries.add(url.origin);
    }
  }

  let valid = registries.size === 1;

  if (registry) {
    valid = valid && registries.has(registry);
  }

  return [valid, registries];
};
