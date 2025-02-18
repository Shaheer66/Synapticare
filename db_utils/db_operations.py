from db_utils.db_connection import connect_db
import mysql.connector
from mysql.connector import Error
import string as str

def insert_user(first_name, last_name, email, phone_number, password,role, verification_code):
    try:
        # Establish database connection
        connection = connect_db()
        
        if connection is None:
            return {"error": "Database connection failed."}
        
        cursor = connection.cursor()

        # SQL query to insert user data
        query = """
        INSERT INTO users (first_name, last_name, email, phone_number, password, role, verification_code)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        
        # Values to be inserted
        values = (first_name, last_name, email, phone_number, password, role, verification_code)

        # Execute the query
        cursor.execute(query, values)
        
        # Commit the transaction
        connection.commit()

        # Close the cursor and connection
        cursor.close()
        connection.close()

        return {"success": "User data inserted successfully."}
    
    except Error as e:
        print(f"Error: {e}")
        return {"error": "Failed to insert user data."}

def get_user_by_email(email):
    """Retrieve user data from the database by email"""
    conn = connect_db()
    cursor = conn.cursor()
    
    cursor.execute("SELECT verification_code FROM users WHERE email = %s", (email,))
    user_data = cursor.fetchone()
    
    if user_data:
        return user_data
    #     return {
    #         "email": user_data[3],  
    #         "verification_code": user_data[9], 
    #         "Is_verified": user_data[7] 
    #     }
    # return None

def mark_user_as_verified(email):
    """Update the user's status to 'verified' in the database"""
    conn = connect_db()
    cursor = conn.cursor()
    
    cursor.execute("UPDATE users SET Is_verified = TRUE WHERE email = %s", (email,))
    conn.commit()
    cursor.close()
    conn.close()





def get_user_password(email):
    """
    Retrieve the user's password, role, id, and email from the database based on the email.

    Args:
        email (str): The user's email.

    Returns:
        tuple: A tuple containing user_id, email, password, role, and is_verified if the user exists.
        None: If the user is not found.
    """
    conn = connect_db()
    cursor = conn.cursor()

    try:
        
        query = "SELECT id, email, password, role, is_verified FROM users WHERE email = %s"
        cursor.execute(query, (email,))
        user = cursor.fetchone()

        if user:
            return user  # Return the user tuple: (user_id, email, password, role, is_verified)
        else:
            return None  # User not found

    except Exception as e:
        print(f"Error during database operation: {e}")
        return None
    finally:
        cursor.close()
        conn.close()
    
    
 
 

def get_salt_from_medicine(medicine_name):
    """
    Get the salt name for a given medicine name.

    Args:
        medicine_name (str): The name of the medicine entered by the user.

    Returns:
        str: The salt name if found, otherwise None.
    """
    conn = connect_db()
    cursor = conn.cursor()

    try:
        query = "SELECT salt FROM medicines WHERE medicine_name = %s"
        cursor.execute(query, (medicine_name,))
        result = cursor.fetchone()

        if result:
            return result[0]  # Return the salt name
        else:
            return None  # Medicine not found
    except Exception as e:
        print(f"Error fetching salt for {medicine_name}: {e}")
        return None
    print(result[3])
    # finally:
    #     cursor.close()
    #     conn.close()

def get_alternative_medicines(salt):
    """
    Get all medicines that contain the same salt and return them sorted by price.

    Args:
        salt (str): The salt name for which alternatives are being searched.

    Returns:
        list: A list of dictionaries containing medicine information, sorted by price.
    """
    conn = connect_db()
    cursor = conn.cursor()

    try:
        # Query to get all medicines with the same salt
        query = """
            SELECT *
            FROM medicines
            WHERE salt = %s
            ORDER BY discounted_price ASC
        """
        cursor.execute(query, (salt,))
        results = cursor.fetchall()

        # If no alternatives found
        if not results:
            return None

        # Format results as a list of dictionaries
        alternatives = [
            {
                "medicine_name": row[1],       # Column 2 (index 1)
                "manufacturer": row[2],        # Column 3 (index 2)
                "salt": row[3],
                "pack_size": row[4],           # Column 5 (index 4)
                "discounted_price": row[5],    # Column 6 (index 5)
                "original_price": row[6],      # Column 7 (index 6)
                "link": row[7]                 # Column 8 (index 7)
            }
            for row in results
        ]
       
        return alternatives

    except Exception as e:
        print(f"Error fetching alternatives for salt {salt}: {e}")
        return None
    finally:
        cursor.close()
        conn.close()



def insert_doctor_user(conn,first_name, last_name, email, phone_number, password,role, verification_code):
    
    try:
        
        
        cursor = conn.cursor()
        query = """
        INSERT INTO users (first_name, last_name, email, phone_number, password, role, verification_code)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (first_name, last_name, email, phone_number, password, role, verification_code))
        conn.commit()
        return cursor.lastrowid  # Return the new user's ID
    except Error as e:
        print(f"Error inserting user: {e}")
        return None


def insert_doctor(conn,user_id, medical_license_number, specialization, years_of_experience):
    
    try:
        cursor = conn.cursor()
        query = """
        INSERT INTO doctors (user_id, medical_license_number, specialization, years_of_experience)
        VALUES (%s, %s, %s, %s)
        """
        cursor.execute(query, (user_id, medical_license_number, specialization, years_of_experience))
        conn.commit()
        return True  # Successfully inserted
    except Error as e:
        print(f"Error inserting doctor: {e}")
        return False
    
    