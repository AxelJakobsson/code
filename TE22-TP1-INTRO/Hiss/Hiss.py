import pyinputplus as pyip # pip install pyinputplus
import time
import random


totalFloors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
currentFloor = 0
pickUpFloor = []
targetFloors = []
sleepTimer = 1




time.sleep(sleepTimer)
print(totalFloors)
time.sleep(sleepTimer) # Pause for 1 second




currentFloor = (pyip.inputInt(prompt="Which floor are you on? ", min=1, max=10)) # Input which floor you want to go to, only ints between 1-10
print(f"Currently on floor: {currentFloor}")

targetFloors.append(pyip.inputInt(prompt="Which floor do you want to go to? ", min=1, max=10)) # Input which floor you want to go to, only ints between 1-10




if (targetFloors[0] > currentFloor): # Select your direction
    direction = 'UP'
else:
    direction = 'DOWN'


print(f"Elevator is currently on floor: {currentFloor}")
print(f"The elevator is going to {targetFloors[0]}")
time.sleep(sleepTimer) # Pause for 1 second






while True: # Someone getting on the elevator
    onFloor = random.randint(1,10) # Generate a random number for the npc to be at
   
    totalFloorsCopy = totalFloors # Make sure they don't choose to go to the same floor that they are already on
    totalFloorsCopy.remove(onFloor) # ^
   
    goToFloor = random.choice(totalFloorsCopy) # Choose a floor to go to
   
   
   
    if (goToFloor > onFloor): # Select the directions
        newDirection = 'UP'
    else:
        newDirection = 'DOWN'
       
    print(f"A person on floor {onFloor} wants to go to floor {goToFloor}. Their direction = {newDirection}, your direction = {direction}")
    break
time.sleep(sleepTimer) # Pause for 1 second
time.sleep(sleepTimer) # Pause for 1 second



def elevatorUP(currentFloor, direction, newDirection):
    if (onFloor >= currentFloor and direction == 'UP'): # if elevator is going up
        print("Elevator is going up")
        pickUpFloor.append(onFloor)
        targetFloors.append(goToFloor)
        
    
        while targetFloors or pickUpFloor:
        
            currentFloor += 1
                
            if currentFloor not in pickUpFloor or currentFloor not in targetFloors:
                time.sleep(sleepTimer) # Pause for 1 second
                print(f"The elevator is currently on floor {currentFloor}")
                
            
            if currentFloor in targetFloors:
                time.sleep(sleepTimer) # Pause for 1 second
                print(f"Elevator reached floor {currentFloor}. Staying to let passengers out.")
                targetFloors.remove(currentFloor)
                

            if currentFloor in pickUpFloor:
                time.sleep(sleepTimer) # Pause for 1 second
                print(f"Elevator reached floor {currentFloor}. Staying to let passengers in.")
                pickUpFloor.remove(currentFloor)
                
                
            if currentFloor < 0:
                    print("Elevator malfunctioned, ending")
                    exit()

def elevatorDOWN(currentFloor, direction, newDirection):
    if (onFloor <= currentFloor and direction == 'DOWN'): # if elevator is going down
        print("Elevator going down")
        direction = 'DOWN'
        pickUpFloor.append(onFloor)
        targetFloors.append(goToFloor)
        
        while targetFloors or pickUpFloor:
            
            currentFloor -= 1
            
            
            if currentFloor not in pickUpFloor or currentFloor not in targetFloors:
                time.sleep(sleepTimer) # Pause for 1 second
                print(f"The elevator is currently on floor {currentFloor}")
            
            
            if currentFloor in targetFloors:
                time.sleep(sleepTimer) # Pause for 1 second
                print(f"Elevator reached floor {currentFloor}. Staying to let passengers out.")
                targetFloors.remove(currentFloor)
                


            if currentFloor in pickUpFloor:
                time.sleep(sleepTimer) # Pause for 1 second
                print(f"Elevator reached floor {currentFloor}. Staying to let passengers in.")
                pickUpFloor.remove(currentFloor)
                
                
                
            if currentFloor < 0:
                print("Elevator malfunctioned, ending")
                exit()

if direction == 'UP':
    print("Up")
    elevatorUP(currentFloor, direction, newDirection)
elif direction == 'DOWN':
    print("down")
    elevatorDOWN(currentFloor, direction, newDirection)


print("Ending")
if not targetFloors and not pickUpFloor:
    time.sleep(sleepTimer) # Pause for 1 second
    print("All passengers have reached their destinations.")
    
