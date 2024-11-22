#! /usr/bin/python3
import sys

data = []
characters = []
values = []
array_length = 0
i = 1
solution = ""



for line in sys.stdin:
    data.append(line.strip())
print(data)

array_length = data[0]
array_length = int(array_length)


for myWord in data[1:array_length + 1]:
    print(myWord)
    characters.append(data[i][0]) # a
    values.append(data[i][2:6])
    i += 1
    
print("characters blwo")
print(characters)
print("values belows")
print(values)

print(data[-1]),
i = 0


c_length = int(len(data[-1])/4)
print(c_length)

for x in range (0, c_length):
    for val in values: 
        print(i)
        if  values[i] in data[-1][:4]:
            solution = solution + characters[i]
        else:
            solution = solution + "?"
        if (i == len(values) - 1):
            i = 0
        else:
            i += 1
print(solution)
    # print(data[-1])
    # print(data)
    # if values[0] in data[-1][:4]:
    #     solution = solution + characters[i]
    # else:
    #     solution = solution + "?"
        


