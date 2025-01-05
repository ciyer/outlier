set SCRIPTPATH (dirname (status --current-filename))

curl "https://fred.stlouisfed.org/graph/fredgraph.csv?id=PCEPILFE" > $SCRIPTPATH/../cpi.csv