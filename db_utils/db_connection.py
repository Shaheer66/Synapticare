import mysql.connector
from mysql.connector import Error

def connect_db():
    """
    Establish a connection to the MySQL database.

    Returns:
        connection (MySQLConnection): A connection object to interact with the database.
    """
    try:
        connection = mysql.connector.connect(
            host="localhost",  
            user="root",  
            password="Pakistan@1122",  
            database="synapticare"  
        )

        if connection.is_connected():
            print("Database connection successful")
            return connection

    except Error as e:
        print(f"Error connecting to database: {e}")
        return None
