#!/usr/bin/env bash

## 生成
npm run genTOC 

## 同步algorithms下的文件名
npm run syncTitle 

## 同步所有文件到questions.md
npm run allQuestions

if [ $1 ]; then
    echo "push to github..."
    git add . && git commit && git push
fi