import csv
from db_utils import connect_db  # Importing the connection module
from validate_data import validate_csv_data

def dump_medicines_to_db(data):
    """
    Inserts validated medicine data into the medicines table in the database.

    Args:
        data (list): A list of dictionaries containing validated medicine data.
    """
    # Establish database connection
    conn = connect_db()
    cursor = conn.cursor()

    try:
        # Iterate through each row in the data
        for row in data:
            try:
                # Extract data from each row
                medicine_name = row['Medicine Name']
                manufacturer = row['Manufacturer']
                salt = row['Salt']
                pack_size = row['Pack Size']
                discounted_price = row['Discounted Price']
                original_price = row['Original Price']
                link = row['Link']

                # Insert the data into the medicines table
                query = """
                INSERT INTO medicines (medicine_name, manufacturer, salt, pack_size, discounted_price, original_price, link)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                """
                cursor.execute(query, (medicine_name, manufacturer, salt, pack_size, discounted_price, original_price, link))
            except Exception as row_error:
                print(f"Error inserting row: {row}, Error: {row_error}")

        # Commit the transaction to save changes
        conn.commit()
        print("Data successfully inserted into the medicines table.")

    except Exception as e:
        # Rollback in case of any critical error
        conn.rollback()
        print(f"An error occurred while inserting data: {e}")

    finally:
        # Close the cursor and the connection
        cursor.close()
        conn.close()



# Path to the CSV file
csv_file_path = "C:/Users/Lenovo/Downloads/allMedicines_unsorted.csv"
cleaned_data=validate_csv_data(csv_file_path)
# Call the function to dump data
dump_medicines_to_db(cleaned_data)
