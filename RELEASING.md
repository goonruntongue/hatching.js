# Publishing a new npm version
The GitHub Actions workflows publish each edition through npm Trusted Publishing.
They do not run for ordinary pushes to `main`.
## First release of a new package
Trusted publishers are configured in the settings of a package that already
exists on npm, so the very first version of each package is published by hand:
```bash
npm login
npm publish --access public
cd vanilla
npm publish --access public
```
After that, add the trusted publishers below and use tags for later releases.
## One-time npm configuration
For each npm package, open **Package settings / Trusted publishers** and add a
GitHub Actions trusted publisher with these values:
| Package | Owner | Repository | Workflow filename |
| --- | --- | --- | --- |
| `@goonruntongue/hatching` | `goonruntongue` | `hatching.js` | `publish-jquery.yml` |
| `@goonruntongue/hatching-vanilla` | `goonruntongue` | `hatching.js` | `publish-vanilla.yml` |
No npm token is stored in GitHub. npm verifies a short-lived GitHub Actions
identity for every release and records provenance for the published package.
## jQuery edition
1. Update `version` in the root `package.json`, then run `npm run build` and `npm test`.
2. Commit and push the release commit to `main`.
3. Create and push a matching annotated tag:
   ```bash
   git tag -a jquery-v1.2.1 -m "jQuery edition 1.2.1"
   git push origin jquery-v1.2.1
   ```
## Vanilla edition
1. Update `version` in `vanilla/package.json`, then run `npm run build` and `npm test`.
2. Commit and push the release commit to `main`.
3. Create and push a matching annotated tag:
   ```bash
   git tag -a vanilla-v1.0.1 -m "Vanilla edition 1.0.1"
   git push origin vanilla-v1.0.1
   ```
The workflow verifies that the tag and the package version match before it
publishes. npm versions are immutable, so use a new patch version for every
release.
