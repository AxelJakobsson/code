import random

while True:
    bet = input("Seven, Under or Over: ").lower()
    if bet in ["seven", "under", "over"]:
        break


dice1 = random.randint(1,6)
dice2 = random.randint(1,6)

sum = dice1+dice2

print(sum)

if sum < 7 and bet == 'under':
    print("You won")
elif sum == 7 and bet == 'seven':
    print("You won")
elif sum > 7 and bet == 'over':
    print("You won")
else:
    print("You lost.")