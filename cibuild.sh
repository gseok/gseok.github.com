#!/usr/bin/env bash
set -e # halt script on error

cd packages/v3.0
bundle install
bundle exec jekyll clean
JEKYLL_ENV=production bundle exec jekyll build
