import pyinputplus as pyip
import random

print ("test")
totalFloors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
currentFloor = 0
pickUpFloor = []
targetFloors = []


print(totalFloors)

targetFloors.append(pyip.inputInt(prompt="Which floor do you want to go to? ", min=0, max=10)) # Input which floor you want to go to, only ints between 0-10


if (targetFloors[0] > currentFloor): # Select your direction
    direction = 'UP'
else:
    direction = 'DOWN'

print(f"Elevator is currently on floor: {currentFloor}") 
print(f"The elevator is going to {targetFloors[0]}")


while True: # Someone getting on the elevator
    onFloor = random.randint(1,10) # What floor they are on
    
    totalFloorsCopy = totalFloors # Make sure they don't choose to go to the same floor that they are already on
    totalFloorsCopy.remove(onFloor) # ^
    
    goToFloor = random.choice(totalFloorsCopy) # Choose a floor to go to
    
    
    
    if (goToFloor > onFloor): # Select the directions
        newDirection = 'UP'
    else: 
        newDirection = 'DOWN'
        
    print(f"A person on floor {onFloor} wants to go to floor {goToFloor}. Their direction = {newDirection}, your direction = {direction}")
    break
    
if (onFloor >= currentFloor and newDirection == direction): # 
    pickUpFloor.append(onFloor)
    targetFloors.append(goToFloor)
    print(f"pickup floors + {pickUpFloor}")
print(max(targetFloors))
    
    
for i in range (max(targetFloors)):
    print(f"The elevator is currently on floor {currentFloor}")
    
    # print(targetFloors)
    print(f"pickup floors + {pickUpFloor}")
    if (currentFloor == min(targetFloors)):
        print(f"Elevator reached floor {currentFloor}. Staying to let passengers out.")
        targetFloors.remove(currentFloor)
        
    elif (currentFloor != min(targetFloors) and currentFloor != min(pickUpFloor)): 
        print("empty floor")
    elif (currentFloor == min(pickUpFloor)):
        print(f"Elevator reached floor {currentFloor}. Staying to let passengers in.")
        pickUpFloor.remove(currentFloor)
    
    currentFloor += 1
print(f"target floors + {targetFloors}")
print(f"pickup floors + {pickUpFloor}")