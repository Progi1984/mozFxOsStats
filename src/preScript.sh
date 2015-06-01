#!/usr/bin/env bash

DATEDAY=`date +"%Y-%m-%d"`
DATEMONTH=`date +"%Y-%m-01"`

if [ "$TRAVIS_REPO_SLUG" == "Progi1984/mozFxOsStats" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] && [ "$TRAVIS_PHP_VERSION" == "5.6" ]; then
  ## Clone develop branch
  cd $HOME
  echo '> Clone develop branch'
  git config --global user.email "progi1984@gmail.com"
  git config --global user.name "Progi1984 CI"
  git clone --quiet --branch=develop https://${GH_TOKEN}@github.com/Progi1984/mozFxOsStats develop > /dev/null
  cd develop

  ## if the file of the month not exists
  if [ ! -f datas-tgz/$DATEMONTH.tgz ]
  then
    echo '>> if the file of the month not exists'
    ## if the file exists on the server
    wget --quiet --spider https://marketplace.cdn.mozilla.net/dumped-apps/tarballs/$DATEMONTH.tgz
    if [[ $? == 0 ]]
    then
      echo '>>> if the file exists on the server'
      echo '>>>> we download the file of the month and commit it'
      ## we download the file of the month and commit it
      wget --directory-prefix=datas-tgz https://marketplace.cdn.mozilla.net/dumped-apps/tarballs/$DATEMONTH.tgz
      git add -f datas-tgz/$DATEMONTH.tgz
      git commit -m "CI Archive File $DATEMONTH"
      git push -f origin develop > /dev/null
    else
      echo '>>> else we develop the file of the day'
      ## else we develop the file of the day
      wget --quiet --spider https://marketplace.cdn.mozilla.net/dumped-apps/tarballs/$DATEDAY.tgz
      if [[ $? == 0 ]]
      then
        echo '>>>> we download the file of the day and commit it'
        ## we download the file of the day and commit it
        wget --directory-prefix=datas-tgz https://marketplace.cdn.mozilla.net/dumped-apps/tarballs/$DATEDAY.tgz
        git add -f datas-tgz/$DATEDAY.tgz
        git commit -m "CI Archive File $DATEDAY"
        git push -f origin develop > /dev/null
      fi
    fi
  fi
fi
