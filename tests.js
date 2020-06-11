'use strict';

const fs = require('fs');
const execa = require('execa');
const { expect } = require('chai');
const validate = require('./lib/validator');

describe('yarnlock-registry-validator', () => {
  it('validates if a lockfile contains unique registry entries', () => {
    const validLockfile = fs.readFileSync('./fixtures/yarn.lock', 'UTF8');
    const [valid, registries] = validate(validLockfile);

    expect(valid).to.be.true;
    expect(registries.size).to.eql(1);
  });

  it('validates if a lockfile contains multiple registry entries', () => {
    const invalidLockfile = fs.readFileSync(
      './fixtures/invalid-yarn.lock',
      'UTF8'
    );
    const [valid, registries] = validate(invalidLockfile);

    expect(valid).to.be.false;
    expect(registries.size).to.eql(2);
  });

  it('CLI works for valid lockfile', () => {
    const child = execa.sync(`./bin/yarnlock-registry-validator`, [
      './fixtures/yarn.lock',
    ]);

    expect(child.stdout).to.eql(
      `yarnlock-registry-validator: The "./fixtures/yarn.lock" lockfile was valid and contains only one, unique registry entry: https://registry.yarnpkg.com`
    );

    expect(child.stderr).to.eql('');
    expect(child.exitCode).to.eql(0);
  });

  it('CLI works for invalid lockfile', () => {
    try {
      execa.sync(`./bin/yarnlock-registry-validator`, [
        './fixtures/invalid-yarn.lock',
      ]);
    } catch (error) {
      expect(error.stderr).to.eql(
        `yarnlock-registry-validator: The "./fixtures/invalid-yarn.lock" lockfile was invalid and contained multiple registry entries: https://registry.yarnpkg.com, https://registry.npmjs.org`
      );

      expect(error.stdout).to.eql('');
      expect(error.exitCode).to.eql(1);
    }
  });
});
