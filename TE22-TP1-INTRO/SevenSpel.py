from color50 import rgb, constants
import colorterminal
import random
import time




lose_color = rgb(255, 0, 0)
win_color = rgb(0, 255, 0)
money_color = rgb(196, 220, 38)


playerMoney = 100
betMoney = None

while playerMoney > 0: 
    while True: # Retries loop until a valid bet amount
        print(money_color + f"You have {playerMoney} money left." + constants.RESET)

        try:
            betMoney = int(input("\nHow much money do you want to bet? "))
        except: # Retry if bet isnt a valid data type (int)
            print("\nInvalid data type")
            
        else: # Check if the bet is a valid amount of money
            if betMoney > 0 and betMoney <= playerMoney:
                playerMoney -= betMoney
                break
            else: # Retry if bet isnt a VALID int
                print(f"Invalid bet amount, you can only bet between 1 and {playerMoney} money.")

    while True:
        try: 
            bet = input("Seven, Under or Over: ").lower()
        except:
            print("invalid input")
        else:
            if bet in ["seven", "under", "over"]:
                break


    dice1 = random.randint(1,6)
    dice2 = random.randint(1,6)

    

    time.sleep(0.4) # Waits for 0.4 seconds
    sum = dice1+dice2 # Add the two dices together

    print(f"\nThe dice roll is {sum}")

    # Check for win condition
    if sum < 7 and bet == 'under':
        print(win_color + f"You won {betMoney} money." + constants.RESET)
        playerMoney += (betMoney*2)

    elif sum == 7 and bet == 'seven':
        print(win_color + f"You won {betMoney*2} money." + constants.RESET)
        playerMoney += (betMoney*3)
    elif sum > 7 and bet == 'over':
        print(win_color + f"You won {betMoney} money." + constants.RESET)
        playerMoney += (betMoney*2)
    else:
        print(lose_color + f"You lost {betMoney} money." + constants.RESET)
        
# if player has less than 0 money      
print(lose_color + "\nOut of money, you lose" + constants.RESET)