#! /usr/bin/python3
import sys

array = []
number = int(0) # the current numbers
k = 0
action = 0
for line in sys.stdin:
    data = line.strip()
    array.append(data)

N = int(array[0]) # target value
array.pop(0)
M = int(array[0]) # multiply value

k_max = M -1

def add(M, number, k):
    number += k
    return number
def mult(m, num):
    num *= m
    return num

# number = add(M, number)
# number = mult(M, number)


while number < N:
    if (number <= 0):
        number = add(M, number, k_max)
        print(f"number: {number}")
        action += 1
    if (number*M <= N):
        number = mult(M, number)
        print(f"number: {number}")
        action += 1
    else:
        number = add(M, number, k_max)
        print(f"number: {number}")
        action += 1
    
print(f"actions: {action}")