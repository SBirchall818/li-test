#!bin/bash
cd /Users/sbirchall/Code/LandInsight/li-test/data
node "/Users/sbirchall/Code/LandInsight/li-test/index" $(while read p; do echo "${p}certificates.csv"; done < <(ls -d */))
cd ..