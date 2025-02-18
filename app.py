from flask import Flask, render_template, request, jsonify, session, url_for, redirect
from utils.verifyEmail import sendEmail
from db_utils.db_connection import connect_db
from db_utils.db_operations import insert_user, get_user_by_email,mark_user_as_verified,insert_doctor_user, insert_doctor
from utils.session_utils import authenticate_user 
from db_utils.db_operations import get_salt_from_medicine, get_alternative_medicines
from decimal import Decimal



# Initialize Flask app
app = Flask(__name__)
app.secret_key = 'Sh123@cfd'

def convert_decimals(data):
    """
    Recursively convert Decimal values to strings in a nested data structure.
    """
    if isinstance(data, list):
        return [convert_decimals(item) for item in data]
    elif isinstance(data, dict):
        return {key: convert_decimals(value) for key, value in data.items()}
    elif isinstance(data, Decimal):
        return str(data)
    else:
        return data

# Routes for frontend files
@app.route("/")
def home():
    return render_template("Home.html")  # Main landing page

@app.route("/signup")
def signup():
    return render_template("signup.html")  # Signup page

@app.route("/verify")
def verify():
    return render_template("verify.html")  # Verification page

@app.route("/login")
def login():
    return render_template("login.html")  # Login page

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")  # Dashboard page

@app.route('/symptoms')
def symptoms():
    return render_template('symptoms.html')  # Render the symptoms page

@app.route('/symptoms_2')
def symptoms_2():
    return render_template('symptoms_2.html')
    
@app.route('/skin')
def skin():
    return render_template('skin.html')  # Render the skins page

@app.route('/skin2')
def skin2():
    return render_template('skin_2.html')

@app.route("/error")
def error():
    return render_template("error.html")  # Error or fallback page


@app.route("/chatbot")
def chatbot():
    return render_template("med_chatbot.html")  # Error or fallback page
@app.route("/doctor_signup")
def doctor_signup():
    return render_template("doctor_signup.html")  # Error or fallback page


@app.route("/patient_home")
def patient_home():
     return render_template("patient_home.html")

@app.route('/med_alter.html')
def med_alter():
    return render_template('med_alter.html')


@app.route("/send_verification", methods=["POST"])
def send_verification():
    # Get the data from the request body (this should include all user details)
    data = request.get_json()
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    email = data.get("email")
    phone_number = data.get("phone_number")
    password = data.get("password")
    role="user"
    # role = data.get("role")
    #print(first_name,last_name,email,phone_number, password)
    if not email or not first_name or not last_name or not phone_number or not password :
        return jsonify({"error": "All fields are required."}), 400  # Check if all fields are provided
    
    try:
        # Send the verification email
        verification_code=sendEmail(email)
        session['email'] = email
        session['verification_code'] = verification_code
        # Insert the user data into the database
        insert_result = insert_user(first_name, last_name, email, phone_number, password,role, verification_code)
        
        # If insertion was successful, return success
        if "success" in insert_result:
            return jsonify({"success": "Verification email sent and user data inserted successfully."})
        else:
            return jsonify(insert_result), 500  # If there was an error with the DB insertion
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to send verification email."}), 500

@app.route("/verify_code", methods=["POST"])
def verify_code():
    # Retrieve the email from session
    email = session.get('email')
    stored_code = session.get('verification_code')
    if not email:
        # If email is not found in the session, it means the session expired or the user didn't sign up
        return jsonify({"error": "Session expired. Please sign up again."}), 400
    
    # Now retrieve the code entered by the user in the form
    data = request.get_json()
    entered_code = data.get("code")
    
    if not entered_code:
        return jsonify({"error": "Verification code is required."}), 400
    
    if entered_code == stored_code:
        # Verification successful, update user status
        mark_user_as_verified(email)  # Assuming this function is defined elsewhere
        session.pop('email', None)  # Clear the session after successful verification
        return jsonify({"success": True, "message": "Verification successful."})
    else:
        return jsonify({"error": "Invalid verification code."}), 400



@app.route('/verify_doctor', methods=['POST'])
def verify_doctor():
    data = request.get_json()

    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    phone_number = data.get('phone_number')
    password = data.get('password')
    medical_license_number = data.get('license_number')
    specialization = data.get('specialization')
    years_of_experience = data.get('experience')
    print(first_name,last_name, email,phone_number, password,medical_license_number,specialization,years_of_experience)
    if not (first_name and last_name and email and phone_number and password and medical_license_number and specialization and years_of_experience):
        return jsonify({'error': 'All fields are required'}), 400
    print(first_name,last_name, email,phone_number, password,medical_license_number,specialization,years_of_experience)
    try:
        verification_code = sendEmail(email)  
        conn=connect_db()
        # Insert user into `users` table
        user_id = insert_doctor_user(conn,first_name, last_name, email, phone_number,password, 'doctor' ,verification_code)

        if not user_id:
            return jsonify({'error': 'Failed to insert user'}), 500

        # Insert doctor-specific details into `doctors` table
        success = insert_doctor(conn, user_id, medical_license_number, specialization, years_of_experience)

        if not success:
            return jsonify({'error': 'Failed to insert doctor details'}), 500
        return jsonify({'message': 'Doctor registered successfully. Verification email sent.'}), 201

    except Exception as e:
        print(f"Error in verify_doctor: {e}")
        return jsonify({'error': 'An error occurred while processing your request'}), 500


@app.route('/auth_login', methods=['POST'])
def auth_login():
    # Get the data from the request
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    # Check if email and password are provided
    if not email or not password:
        return jsonify({"success": False, "error": "Email and password are required"}), 400

    # Authenticate the user
    user = authenticate_user(email, password)
    
    if user:
        # If the user is authenticated successfully, return success and redirect URL
        return jsonify({"success": True, "redirect_url": url_for('patient_home')}), 200
    else:
        # If authentication fails, return error
        return jsonify({"success": False, "error": "Invalid email or password"}), 401



@app.route('/search-medicine', methods=['POST'])
def search_medicine():
    #Get the medicine name from the request
    data = request.get_json()
    medicine_name = data.get('medicine_name')

    if not medicine_name:
        return jsonify({"error": "Medicine name is required."}), 400

    #  Fetch the salt for the entered medicine name
    salt = get_salt_from_medicine(medicine_name)
    print(salt)
    if not salt:
        return jsonify({"error": "Medicine not found as you are using some generalized or a herbal medicine or Kindly recheck the medicine name."}), 404

    # Get alternative medicines based on the salt
    alternatives = get_alternative_medicines(salt)
    print(alternatives)
    if not alternatives:
        return jsonify({"error": "No alternatives found."}), 404

    preprocessed_data = convert_decimals(alternatives)
    return jsonify({"result": preprocessed_data})


# Start the app
if __name__ == "__main__":
    app.run(debug=True, port= 5000)
