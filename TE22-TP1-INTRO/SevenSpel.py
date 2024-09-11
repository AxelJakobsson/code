import random

playerMoney = 100
betMoney = None

while playerMoney > 0: 
    while True: # Retries loop until a valid bet choice is selected (seven, under or over)
            while True: # Retries loop until a valid bet amount
                print(f"You have {playerMoney} money left.")

                try:
                    betMoney = int(input("How much do you want to bet? "))
                except: # Retry if bet isnt a valid data type (int)
                    print("Invalid data type")
                    
                else: # Check if the bet is a valid amount of money
                    if betMoney > 0 and betMoney <= playerMoney:
                        playerMoney -= betMoney
                        break
                    else: # Retry if bet isnt a VALID int
                        print(f"Invalid bet amount, you can only bet between 1 and {playerMoney} money.")
        
            bet = input("Seven, Under or Over: ").lower()
            if bet in ["seven", "under", "over"]:
                break


    dice1 = random.randint(1,6)
    dice2 = random.randint(1,6)

    sum = dice1+dice2 # Add the two dices together

    print(f"The dice roll is {sum}")

    # Check for win condition
    if sum < 7 and bet == 'under':
        print(f"You won {betMoney*2-betMoney} money.")
        playerMoney += (betMoney*2)

    elif sum == 7 and bet == 'seven':
        print(f"You won {betMoney*3-betMoney} money.")
        playerMoney += (betMoney*3)
    elif sum > 7 and bet == 'over':
        print(f"You won {betMoney*2-betMoney} money.")
        playerMoney += (betMoney*2)
    else:
        print(f"You lost {betMoney} money.")
        
# if player has less than 0 money      
print("Out of money, you lose")