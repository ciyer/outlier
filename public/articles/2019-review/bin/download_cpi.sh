#!/usr/bin/env bash

SCRIPTPATH=`dirname $(realpath $0)`
curl https://fred.stlouisfed.org/graph/fredgraph.csv?id=PCEPILFE > $SCRIPTPATH/../cpi.csv