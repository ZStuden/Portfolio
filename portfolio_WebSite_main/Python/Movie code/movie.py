#python module created by Zen Sabio
price=12.00
print()
print("The Makings of a Quantum Computer")
print()
print("The price per person is $12.00.")
print()
print("For persons over 65 years old, a 20% discount applies.")
print()
persons = float(int(input("How many persons in your party?:")))
print()
elders = float(int(input("How many are older than 65 years old?:")))
print()
totalpricelarge = persons * price - elders * price * 0.2
totalpricesmall = "{:.2f}".format(totalpricelarge) 
print( "Your total is $", totalpricesmall)

input()


