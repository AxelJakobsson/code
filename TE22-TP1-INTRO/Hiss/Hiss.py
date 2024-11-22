import pyinputplus as pyip  # pip install pyinputplus
from colorama import Fore, Back, Style # pip install colorama
import random
import time
import importlib.util
 
# packages to check for below
package_name1 = 'console_color'
package_name2 = 'colorama'
 
# check if packages are installed
if importlib.util.find_spec(package_name1) is None:
    print(package_name1 +" is not installed. Run: pip install " + package_name1)
    exit()
if importlib.util.find_spec(package_name2) is None:
    print(package_name2 +" is not installed. Run: pip install " + package_name2)
    exit()

sleep_timer = 1

class Passenger: # class for passenger
    def __init__(self, start_floor, target_floor):
        self.start_floor = start_floor
        self.target_floor = target_floor
        self.state = "waiting"


class Elevator:
    def __init__(self):
        self.current_floor = 0
        self.passengers = []


    def move(self):
        # keep going until all passengers are finished
        while any(passenger.state != "finished" for passenger in self.passengers):
            stops = [] # list of all stops
            for passenger in self.passengers:
                if passenger.state == "waiting":
                    stops.append(passenger.start_floor) # add the pickup floor to the stops
                elif passenger.state == "picked_up":
                    stops.append(passenger.target_floor) # add the target floor to the stops


            if not stops: # if there are no floors left for the elevator to go to
                break
            
            # sort the array in ascending order
            stops = sorted(stops)


            # choose direction, if the current floor is higher than the biggest stop go to the first in the list otherwise fall back to the biggest stop
            target_floor = stops[0] if self.current_floor > max(stops) else max(stops)


            print(f"Elevator is currently on floor {self.current_floor}")
            self.passenger_check()


            # make the elevator move
            if self.current_floor < target_floor:
                self.current_floor += 1
                time.sleep(sleep_timer)
            elif self.current_floor > target_floor:
                self.current_floor -= 1
                time.sleep(sleep_timer)
       
        print(Fore.CYAN + "All passengers reached their destination")
        print(Fore.WHITE) # go back to white color
           
           
   
    def passenger_check(self):
        for passenger in self.passengers: # go through all passengers
            if passenger.state == "waiting" and self.current_floor == passenger.start_floor: # pick up passenger on current floor if there are any that are waiting
                print(Fore.GREEN) # set console prints to green color
                print(f"Picking up passenger at floor {self.current_floor}" + Fore.WHITE)
                passenger.state = "picked_up"
            elif passenger.state == "picked_up" and self.current_floor == passenger.target_floor: # let a passenger out if they are in the elevator and they want to go to the current floor
                print(Fore.RED) # set console prints to red
                print(f"Letting passenger out at floor {self.current_floor}" + Fore.WHITE)
                passenger.state = "finished"


# initialize the elevator
elevator = Elevator()


# get user input for the floor they want to go to
player_start = pyip.inputInt(prompt="Which floor are you on? ", min=0, max=10) # pyinput, can choose from 0-10
player_target = pyip.inputInt(prompt="Which floor do you want to go to? ", min=0, max=10) # pyinput, can choose from 0-10
player = Passenger(player_start, player_target)


# create a randomized npc that has random start and target floors
npc_start = random.randint(0, 10)
npc_target = random.randint(0, 10)
while npc_start == npc_target: # create a new target floor until its not the same as the start one
    npc_target = random.randint(0, 10)
npc = Passenger(npc_start, npc_target)


print(f"NPC created with start floor {npc_start} and target floor {npc_target}")


# add passengers to the elevator so it can handle them
elevator.passengers.append(player)
elevator.passengers.append(npc)


# start the elevator move system
print("Starting elevator simulation...")
elevator.move()