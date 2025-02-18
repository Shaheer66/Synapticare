from db_utils.db_operations import get_user_password

def authenticate_user(email, password):
    """
    Authenticate a user by verifying the provided email and password.

    Args:
        email (str): The user's email.
        password (str): The user's password.

    Returns:
        dict: A dictionary containing user details if authentication is successful.
        None: If authentication fails.
    """
    # Fetch user details including password, role, and verification status from the database
    user = get_user_password(email)

    if user:
        user_id, user_email, stored_password, role, is_verified = user

        # Check if the password matches
        if password == stored_password:
            # Check if the user is verified
            if is_verified:
                # Return user details
                return {
                    "id": user_id,
                    "email": user_email,
                    "role": role,
                    "is_verified": is_verified
                }
            else:
                # User is not verified
                return None
        else:
            # Incorrect password
            return None
    else:
        # User not found
        return None
