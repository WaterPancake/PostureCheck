import lmstudio as lms 
from prompt import EVALUATION_PROMP



model_name = "openai/gpt-oss-20b"

model = lms.llm(model_name)
example_dict = {
    "movement": "Deep squat",
    "femur": "short", # alt: long, normal
    "parallel": "failed", # alt successfded
    "kneeovertoe": "failed"
}

example_dict = {
    "movement": "Deep squat",
    "femur": "long", # alt: long, normal
    "parallel": "failed", # alt successfded
    "kneeovertoe": "successed"
}

message = EVALUATION_PROMP.format(**example_dict)
result = model.respond(message)
print(result)
# print("\n")
# result = model.respond(message)
# print(result)
