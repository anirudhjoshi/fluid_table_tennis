#!/bin/sh

./publish.sh

git checkout master
git merge develop
git push origin

git checkout develop
