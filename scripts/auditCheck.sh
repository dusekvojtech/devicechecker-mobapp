#! /usr/bin/env bash

# Fail only on moderate and above
yarn audit; [[ $? -ge 4 ]] && exit 1 || exit 0