#! /usr/bin/python3
import sys
data = []
res = ""

for line in sys.stdin:
    line = int(line)
    data.append(line)
    
print(data)

for v in data:
    print(v)
    if(v == 90):
        res = "rätvinklig"
        break
    elif(v > 90):
        res = "trubbig"
        break
    else:
        res = "spetsig"
print(res)

# python3 uppg1.py < exempeldata/exempeldata/triangelfabriken1.in