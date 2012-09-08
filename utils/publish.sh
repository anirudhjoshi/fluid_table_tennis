#!/bin/sh

./build.sh

cp -r ../build/ ../../
rm -rf ../build/

git checkout gh-pages

cp ../../build/* ../

rm -rf ../../build/
rm -rf ../build/

git commit -am "updated"

git checkout develop