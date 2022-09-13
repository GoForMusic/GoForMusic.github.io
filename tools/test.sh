#!/usr/bin/env bash
#
# Build and test the site content
#
# Requirement: html-proofer, jekyll
#
# Usage: See help information

set -eu

SITE_DIR="_site"

_config="_config.yml"

help() {
  echo "Build and test the site content"
  echo
  echo "Usage:"
  echo
  echo "   bash ./tools/test.sh [options]"
  echo
  echo "Options:"
  echo '     -c, --config   "<config_a[,config_b[...]]>"    Specify config file(s)'
  echo "     -h, --help               Print this information."
}

main() {
  # clean up
  if [[ -d $SITE_DIR ]]; then
    rm -rf "$SITE_DIR"
  fi

  _baseurl="$(grep '^baseurl:' "$_config" | sed "s/.*: *//;s/['\"]//g;s/#.*//")"

  # build
  JEKYLL_ENV=production bundle exec jekyll build \
    --destination "$SITE_DIR$_baseurl" \
    --config "$_config"

  # test
  bundle exec htmlproofer "$SITE_DIR" \
    --disable-external \
    --check-html \
    --allow_hash_href
}

while (($#)); do
  opt="$1"
  case $opt in
  -c | --config)
    _config="$2"
    shift
    shift
    ;;
  -h | --help)
    help
    exit 0
    ;;
  *)
    # unknown option
    help
    exit 1
    ;;
  esac
done

main
