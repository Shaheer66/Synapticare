from medical_chatbot_main.chatbot_class import SymptomPredictor

# Create an instance of SymptomsPredictor
symptom_predictor = SymptomPredictor()

# Test Inputs
conversation_history = [
    {"sender": "user", "message": "I have a headache and fever"},
    {"sender": "bot", "message": "How long have you had these symptoms?"},
    {"sender": "user", "message": "For two days"},
]

latest_input = "Now I feel nauseous"

# Print the test inputs
print("Testing SymptomsPredictor with:")
print("Conversation History:", conversation_history)
print("Latest Input:", latest_input)

# Run the prediction
try:
    result = symptom_predictor.predict(conversation_history, latest_input)
    print("Prediction Output:", result)
except Exception as e:
    print("Error Occurred:", e)
