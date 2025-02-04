import stateCd

from stateCd import abbrev_to_us_state

answer = input('Do you need to look up a state code? type YES to input or NO to Cancel: ')

while answer == 'YES':

    state = input('Please enter 2 variable state code: ')

    if state in abbrev_to_us_state:

        print('The State code', state , 'is for', abbrev_to_us_state[state])

    answer = input('Do you need to look up a state code? type YES to input or NO to Cancel: ')

print('Bye :)')

        

             

   





    

    



