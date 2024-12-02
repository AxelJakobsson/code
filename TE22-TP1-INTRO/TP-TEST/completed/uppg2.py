#! /usr/bin/python3
import sys

trul_score = 0
henry_score = 0

for line in sys.stdin:
    data = line
    
for i in range(len(line) + 1):
    if line[i-1:i] == "T":
        trul_score += 1
    elif line[i-1:i] == 'H':
        henry_score += 1
    if(trul_score -henry_score >= 2 and trul_score >= 11):
        trul_score = 0
        henry_score = 0
    elif(henry_score - trul_score >= 2 and henry_score >= 11):
        trul_score = 0
        henry_score = 0



print(f"{trul_score}-{henry_score}")


    

#python3 uppg2.py < exempeldata/exempeldata/trulstrubbel1.in