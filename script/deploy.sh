#!/usr/bin/env bash

npm run genTOC 

npm run syncTitle 

npm run allQuestions

if [ $1 ]; then
    echo "push to github..."
    git add . && git commit && git push
fi
