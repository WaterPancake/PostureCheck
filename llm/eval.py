import lmstudio as lms 
from prompt import EVALUATION_PROMP



def eval_movement(params: dict, model_name = "openai/gpt-oss-20b"):
    model = lms.llm(model_name)
    message = EVALUATION_PROMP.format(**params)

    return model.respond(message)

