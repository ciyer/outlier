#!/usr/bin/env bash

# Use template from https://gist.github.com/knanne/37712efaea0be6f10eb027c7aa82801e to export notebook
jupyter nbconvert --to html --template nbconvert_template_altair.tpl 2019-review.ipynb