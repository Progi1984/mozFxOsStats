#!/usr/bin/env bash

DATEDAY=`date +"%Y-%m-%d"`

if [ "$TRAVIS_REPO_SLUG" == "Progi1984/mozFxOsStats" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] && [ "$TRAVIS_PHP_VERSION" == "5.6" ]; then
  ## Clone gh-pages branch
  cd $HOME
  git config --global user.email "progi1984@gmail.com"
  git config --global user.name "Progi1984 CI"
  git clone --quiet --branch=gh-pages https://${GH_TOKEN}@github.com/Progi1984/mozFxOsStats gh-pages > /dev/null
  cd gh-pages

  ## Copy stats.json
  cp $TRAVIS_BUILD_DIR/src/stats.json statics/stats.json

  ## Commit it the update of the file
  git commit statics/stats.json -m "CI Stats File Update \"$DATEDAY\""
  git push -fq origin gh-pages > /dev/null
fi