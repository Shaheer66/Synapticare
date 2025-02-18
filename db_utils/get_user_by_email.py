

from db_connection import db_connection  # Ensure you import your DB connection module

def get_user_by_email(email):
    """Retrieve user data from the database by email"""
    conn = db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT verification_code FROM users WHERE email = %s", (email,))
    user_data = cursor.fetchone()
    
    if user_data:
        return user_data
        # return {
        #     "email": user_data[2],  
        #     "verification_code": user_data[8], 
        #     "verified": user_data[6] 
        # }
    return None

def mark_user_as_verified(email):
    """Update the user's status to 'verified' in the database"""
    conn = db_connection()
    cursor = conn.cursor()
    
    cursor.execute("UPDATE users SET Is_verified = TRUE WHERE email = %s", (email,))
    conn.commit()
