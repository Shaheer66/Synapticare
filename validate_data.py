import csv

def validate_csv_data(csv_file_path):
    """
    Validates and cleans the CSV data for compatibility with the medicines table.

    Args:
        csv_file_path (str): Path to the CSV file.

    Returns:
        list: Cleaned rows ready for insertion.
    """
    cleaned_data = []
    issues_found = False  # Flag to track issues in the data

    with open(csv_file_path, mode='r', encoding='utf-8') as file:
        csv_reader = csv.DictReader(file)

        for row in csv_reader:
            try:
                # Clean and validate data
                medicine_name = row['Medicine Name'].strip()
                manufacturer = row['Manufacturer'].strip()
                salt = row['Salt'].strip()
                pack_size = row['Pack Size'].strip()
                
                # Handle prices (convert to float or set to 0 if empty)
                discounted_price = row['Discounted Price'].replace('Rs', '').replace(',', '').strip()
                discounted_price = float(discounted_price) if discounted_price else 0.0

                original_price = row['Original Price'].replace('Rs', '').replace(',', '').strip()
                original_price = float(original_price) if original_price else 0.0

                link = row['Link'].strip()

                # Check for missing required fields
                if not medicine_name or not salt:
                    issues_found = True
                    print(f"Missing required fields in row: {row}")
                    continue  # Skip this row
                
                # Append cleaned data to the list
                cleaned_data.append({
                    "Medicine Name": medicine_name,
                    "Manufacturer": manufacturer,
                    "Salt": salt,
                    "Pack Size": pack_size,
                    "Discounted Price": discounted_price,
                    "Original Price": original_price,
                    "Link": link,
                })

            except Exception as e:
                issues_found = True
                print(f"Error processing row: {row}, Error: {e}")

    if issues_found:
        print("Issues were found in the data. Please review the messages above.")
    else:
        print("Data is clean and ready for insertion.")

    return cleaned_data

# Path to the CSV file
csv_file_path = "C:/Users/Lenovo/Downloads/allMedicines.csv"

# Validate and clean the data
cleaned_data = validate_csv_data(csv_file_path)
print(f"Cleaned data ready for insertion: {len(cleaned_data)} rows")
