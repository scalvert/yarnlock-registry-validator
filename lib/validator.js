'use strict';

const lockfile = require('@yarnpkg/lockfile');
const URL = require('whatwg-url').URL;

module.exports = function validate(lockfileContents) {
  const parsed = lockfile.parse(lockfileContents);

  const registries = new Set();
  for (const [name, meta] of Object.entries(parsed.object)) {
    const url = new URL(meta.resolved);

    if (!registries.has(url.origin)) {
      registries.add(url.origin);
    }
  }

  return [registries.size === 1, registries];
};
