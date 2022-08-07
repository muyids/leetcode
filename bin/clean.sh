#!/bin/bash

set -ex

code_home=${LEETCODE_CODE_HOME}

rm -rf ${code_home}/src/main/java/com/muyids/lc/p*

rm -f *.out
rm -rf *.dSYM
rm -f main.*

rm -rf target