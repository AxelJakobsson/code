#! /usr/bin/python3
import sys

nsa = ""
hp = []
remove = []
end_game = False
attacks_attempt = 0
for line in sys.stdin:
    if (nsa == ""):
        nsa = line
    data = line
    
nsa = nsa.replace(" ", "")

N = int(nsa[0:1]) # Number of monsters
S = int(nsa[1:2])# Direct damage
A = int(nsa[2:3])# Area damage

data = data.replace(" ", "")
if not hp:
    for i in range(N):
        hp.append(int(data[i:i+1]))

# def check_if_alive(N):
#     for i in range(len(hp)):
#         if hp[i] <= 0:
#             print("monster defeated")
#             print(hp)
#             remove.append(i)
#     if not hp:
#         print("all monsters defeated")
#         end_game = True
#     for i in range(len(remove)):
#         hp.pop(i)
    
#     remove.clear()

def check_if_alive(N):
    for i in range(len(hp)):
        if hp[i] > 0:
            print(hp)
        elif hp[i] <= 0:
            hp.pop(i)
        else:
            print("Ending game")
            return True
        
        
def attack(hp, S, A):
    
    target = hp[0]
    for i in range(len(hp)):
        if int(hp[i]) > int(target):
            target = hp[i]
    target = hp.index(target)
    hp[target] = hp[target] - S
    
    for i in range(len(hp)):
        hp[i] = hp[i] - A
        
    
    
# while end_game == False:
#     attack(hp, S, A)
#     attacks_attempt += 1
#     end_game = check_if_alive(N)
#     print(f"attacks: {attacks_attempt}")
#     print(end_game)
    
for x in range(19):
    attacks_attempt += 1
    print(f"attacks: {attacks_attempt}")
    attack(hp, S, A)
    end_game = check_if_alive(N)
    
    print(end_game)
    if end_game:
        break
