import random

money = 100
betMoney = 0

while money > 0:
    while True:
            while True:
                 print(f"You have {money} money left.")
                 betMoney = int(input("How much do you want to bet? "))
                 if betMoney > 0 and betMoney <= money:
                      break
                 else:
                      print(f"Invalid bet you can bet between 1 and {money}")
                
            bet = input("Seven, Under or Over: ").lower()
            if bet in ["seven", "under", "over"]:
                break


    dice1 = random.randint(1,6)
    dice2 = random.randint(1,6)

    sum = dice1+dice2

    print(f"The dice roll is {sum}")

    if sum < 7 and bet == 'under':
        print("You won")
        money += (betMoney*2)

    elif sum == 7 and bet == 'seven':
        print("You won")
        money += (betMoney*3)
    elif sum > 7 and bet == 'over':
        print("You won")
        money += (betMoney*2)
    else:
        print("You lost.")
        money -= (betMoney)

    print(f"Your current money is: {money}")