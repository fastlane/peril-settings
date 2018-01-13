Peril
=====

[The server](https://github.com/danger/peril) receives webhook events from every org repository (new issues and pull requests). We can hook into that in the `danger/regressions.ts` files.

Automatic PR Checking with Peril
--------------------------------

[Peril](https://github.com/Danger/Peril) is a server which runs [Danger-JS](http://danger.systems/js/) automatically, on all pull requests for the `fastlane/fastlane` repo. This repo contains our Danger rules. Danger can check for pull request metadata, commit information, which files were changed, all kinds of things.

Here's some links to the key things

-   [Peril](https://github.com/danger/peril)
-   [Danger JS](http://danger.systems/js/)
-   [Peril for Orgs](https://github.com/danger/peril/blob/master/docs/setup_for_org.md)
-   [Peril on the fastlane Heroku team](https://dashboard.heroku.com/apps/fastlane-peril)

### TLDR on this Repo?

Peril is Danger running on a web-server, this repo is the configuration for that, currently the dangerfiles in [org](org/)
run on every issue and pull request for all our repos.
