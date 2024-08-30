# Variabler för spelarens stats
player_stat_health = 0 # Decides a players health

player_stat_attack = 0 # Boosts a players physical damage

player_stat_intelligence = 0 # Boosts a players magical damage

player_stat_criticalStrikeChance = 0 # Boosts a players critical strike chance

player_stat_criticalStrikeDamage = 0 # Boosts a players critical strike damage

player_stat_defense = 0 # Take less damage based on defense. 

player_stat_speed = 0 # Decides who goes first in battle, higher speed = go before the opponent

player_stat_agility = 0 # Adds slightly to speed and some dagger/bow scaling




# Fråga efter namn 
player_name = input("Vad heter du? ")
print("Hej " + player_name + "!")

# Välj en klass
while True:
    player_class = input("Vilken klass vill du välja? Warrior, Mage eller Rogue. ").capitalize()

    # Ifall man valt en klass, bryt ut ur loopen.
    if player_class == "Warrior" or player_class == "Mage" or player_class == "Rogue":
        # Forca en stor bokstav i början av klassnamnet
        break
    else:
        print("Finns ingen klass med det namnet, testa igen.")

print("Du valde " + player_class + "!")
if player_class == "Warrior":
    player_stat_health = player_stat_health + 15
    player_stat_attack = player_stat_attack + 4
    player_stat_intelligence = player_stat_intelligence + 0
    player_stat_criticalStrikeChance = player_stat_criticalStrikeChance + 0.05
    player_stat_criticalStrikeDamage = player_stat_criticalStrikeDamage + 1.2
    player_stat_defense = player_stat_defense + 3
    player_stat_speed = player_stat_speed + 5
    player_stat_agility = player_stat_agility + 5

if player_class == "Mage":
    player_stat_health = player_stat_health + 7
    player_stat_attack = player_stat_attack + 0
    player_stat_intelligence = player_stat_intelligence = 6
    player_stat_criticalStrikeChance = player_stat_criticalStrikeChance + 0.05
    player_stat_criticalStrikeDamage = player_stat_criticalStrikeDamage + 1.2
    player_stat_defense = player_stat_defense + 0
    player_stat_speed = 3
    player_stat_agility = 0

if player_class == "Rogue":
    player_stat_health = player_stat_health + 10
    player_stat_attack = player_stat_attack + 5
    player_stat_intelligence = player_stat_intelligence
    player_stat_criticalStrikeChance = player_stat_criticalStrikeChance + 0.15
    player_stat_criticalStrikeDamage = player_stat_criticalStrikeDamage + 1.4
    player_stat_defense = player_stat_defense + 1
    player_stat_speed = 8
    player_stat_agility = 4

def printStatus():
    print("---------STATS---------")
    print("       Health = " + str(player_stat_health))
    print("       Attack = " + str(player_stat_attack))
    print("       Intelligence = " + str(player_stat_intelligence))
    print("       Critical Strike Chance = " + str(player_stat_criticalStrikeChance * 100) + "%")
    print("       Critical Strike Damage = " + str(player_stat_criticalStrikeDamage))
    print("       Defense = " + str(player_stat_defense))
    print("       Speed = " + str(player_stat_speed))
    print("       Agility = " + str(player_stat_agility))
    print("-----------------------")

# Används i menyn
player_choice = ""

def menu():
    print(" ")
    print(" ")
    print("Stats")
    print(" ")
    print("Adventure ")
    print(" ")
    print("Inventory")
    
    
    while True:
        player_choice = input("Vad vill du göra? ").capitalize()
        
        if player_choice == "Stats":
            printStatus()
            break
        if player_choice == "Adventure":
            adventure()
            break
        if player_choice == "Inventory":
            inventory()
            break
        else:
            print("Not valid input")

menu()



