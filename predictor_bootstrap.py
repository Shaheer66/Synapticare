import threading
from medical_chatbot_main.chatbot_class import SymptomPredictor

# Shared state
symptom_predictor = None
predictor_ready   = threading.Event()
predictor_failed  = threading.Event()

def bootstrap_symptom_predictor():
    """
    Load the SymptomPredictor in the background.
    On success sets predictor_ready; on failure sets predictor_failed.
    """
    global symptom_predictor
    try:
        symptom_predictor = SymptomPredictor()
        predictor_ready.set()
        print(" SymptomPredictor loaded successfully.")
    except Exception as e:
        predictor_failed.set()
        print(f" SymptomPredictor failed to load: {e}")

def handle_prediction( session_id, query: str):
    """
    Central helper that enforces readiness and error checks.
    Returns (result, error_code) where error_code is:
      - "warmup"   : still loading
      - "failed"   : initialization failed
      - "no_result": predictor returned falsy
      - any other  : exception message
      - None       : on success (result contains the prediction)
    """
    if predictor_failed.is_set():
        return None, "failed"
    if not predictor_ready.is_set():
        return None, "warmup"
    try:
        result = symptom_predictor.predict(session_id,query)
        if not result:
            return None, "no_result"
        return result, None
    except Exception as e:
        return None, str(e)
