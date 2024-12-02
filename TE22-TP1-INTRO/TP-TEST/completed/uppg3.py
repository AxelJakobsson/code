#! /usr/bin/python3
import sys

real_string = []
x = 1
found_string = ""

for line in sys.stdin:
    data = line
    real_string.append(data.strip())
real_string.pop()

string = real_string[0]

for i in range(len(data)):
    if (data[i-1:i] == string[x-1:x]):
        found_string += string[x-1:x]
        x += 1

if (found_string == string):
    print("Ja")
else:
    print("Nej")
