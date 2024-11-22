#! /usr/bin/python3
import sys

for i in sys.stdin:
    ap = i.split()
    a = int(ap[0])
    p = int(ap[1])

if a*7 > p*13:
    print("Axel")
elif a*7 == p*13:
    print("Lika")
else:
    print("Petra")