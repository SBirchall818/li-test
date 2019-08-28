#!bin/bash
cd /Users/sbirchall/Code/LandInsight/li-test/data
node -r esm "/Users/sbirchall/Code/LandInsight/li-test/index" $(ulimit -n) $(while read p; do echo "${p}certificates.csv"; done < <(ls -d */))
cd ..