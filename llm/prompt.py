MOVEMENT_RATING = ["Good", "Bad", "Okay"]
MOVEMENT = ["Deep Squat"]


# feature that are to be calculated
FEMUR_LENGTH = ["Short", "Normal", "Long"]
ARM_LENGTH = ["Short", "Normal", "Long"]
ANKLE = ["Flat", "Raised"]

EXCERCISE_SYSTEM_PROMPT = f""" 
You are to provide assistance to someone learning how to perform compound excercises. 
You will be given a verbal discription of their form and are to give a score from:

{MOVEMENT_RATING}

Afterwards, you are to identify issues with their form and recomend excercises and stretches to improve their foarm. 
Also include any important details that may be unique to their body structure as will also be provided.

Respond as if you were talking too them directly.
"""

EVALUATION_PROMP = EXCERCISE_SYSTEM_PROMPT + """
A person performed a {movement}.

They had were {parallel} in breaking parallel.
They {kneeovertoe} in establishing knee over toes.

The person has {femur} legnth femurs. 

based on this, evaluate the person form and provide advice how to fix any shortcomings.
"""