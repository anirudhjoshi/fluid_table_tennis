#!/bin/sh

mkdir -p ../build

cat ../src/js/fluid.js ../src/js/table_tennis.js ../src/js/colors.js ../src/js/main.js > ../build/f.js
cat ../src/css/main.css > ../build/f.css

cp ../src/index.html ../build/