## yarnlock registry validator

![CI Build](https://github.com/scalvert/yarnlock-registry-validator/workflows/CI%20Build/badge.svg)

A simple CLI that validates a yarn.lock contains a unique registry origin.

### Installation

```sh
yarn global add yarnlock-registry-validator
```

### Usage

```sh
usage: yarnlock-registry-validator <lockfile> [registry]
  lockfile: path to the lockfile you  wish to update
  registry: optional unique registry you wish to check for

example:
  yarnlock-registry-validator ./yarn.lock
```

The following command will ensure that there's only one, unique registry origin in the provided lockfile.

```sh
yarnlock-registry-validator ./yarn.lock

# Valid:
# yarnlock-registry-validator: The "./fixtures/yarn.lock" lockfile was valid and contains only one, unique registry origin: https://registry.yarnpkg.com

# Invalid:
# yarnlock-registry-validator: The "./fixtures/invalid-yarn.lock" lockfile was invalid and contained multiple registry origins: https://registry.yarnpkg.com, https://registry.npmjs.org
```

You can also pass a `registry` argument, which will validate the presence of a single, specific registry.

```sh
yarnlock-registry-validator ./yarn.lock https://registry.yarnpkg.com

# Valid:
# yarnlock-registry-validator: The "./fixtures/yarn.lock" lockfile was valid and contains only one, unique registry origin: https://registry.yarnpkg.com

# Invalid:
# yarnlock-registry-validator: The "./fixtures/invalid-yarn.lock" lockfile was invalid and contained multiple registry origins: https://registry.yarnpkg.com, https://registry.npmjs.org
```

### Attribution

This package is heavily inspired by [Stefan Penner](https://github.com/stefanpenner)'s [yarnlock-origin-changer](https://github.com/stefanpenner/yarnlock-origin-changer).
