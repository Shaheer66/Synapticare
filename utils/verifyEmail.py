# verifyEmail.py

import smtplib
import random
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def sendEmail(email):
    # Generate a 6-digit random verification code
    verification_code = str(random.randint(100000, 999999))
    
    # Email credentials (replace with your credentials)
    sender_email = "shaheer14326@gmail.com"
    sender_password = "nwgr xehr nebc fxpk"
    
    # Email content
    subject = "Your Verification Code"
    body = f"Your verification code is: {verification_code}"
    
    # Setting up the email
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = email
    message["Subject"] = subject
    message.attach(MIMEText(body, "plain"))
    
    try:
        # Connect to the email server and send the email
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, email, message.as_string())
        server.quit()
        
        print(f"Verification code sent successfully to {email}")
        return verification_code  # Return the code for validation
    except Exception as e:
        print(f"Failed to send email: {e}")
        return None


