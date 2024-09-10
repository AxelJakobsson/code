import random

money = 100
betMoney = 1


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
    money + (betMoney*2)

elif sum == 7 and bet == 'seven':
    print("You won")
    money + (betMoney*3)
elif sum > 7 and bet == 'over':
    print("You won")
    money + (betMoney*2)
else:
    print("You lost.")
    money + (betMoney*0)