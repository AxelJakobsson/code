#! /usr/bin/python3
import sys

for i in sys.stdin:
    a = i
    b = i
    
if '+' in a:
    a = a.replace("+", "")
    print("18" + a)
    
elif int(a[0:2]) < 19:  
    a = a.replace("-", "")
    print("20" + a)
else:
    a = a.replace("-", "")
    print("19" + a)