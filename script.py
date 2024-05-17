import RPi.GPIO as GPIO
import time
import firebase_admin
from firebase_admin import credentials, firestore
 
# Initialize Firebase Admin SDK with service account
cred = credentials.Certificate('/home/raspberry_user/Desktop/iotproject-5b0c7-firebase-adminsdk-3cdjc-d47301e1cb.json')
firebase_admin.initialize_app(cred)
 
# Get a Firestore client
db = firestore.client()
 
# Setup GPIO pin for LED
LED_PIN = 7
GPIO.setmode(GPIO.BCM)
GPIO.setup(LED_PIN, GPIO.OUT)
 
# Define callback function to handle LED state changes
def on_led_state_change(doc_snapshot, changes, read_time):
    for doc in doc_snapshot:
        print(f'Received LED state change: {doc.id}')
        led_state = doc.to_dict().get('isOn')
        control_led(led_state)
 
# Listen for LED state changes in all documents within the 'ledStates' collection
led_states_ref = db.collection('ledStates')
led_states_watch = led_states_ref.on_snapshot(on_led_state_change)
 
# Function to control LED based on state
def control_led(state):
    if state:
        print("Turning on LED")
        GPIO.output(LED_PIN, GPIO.HIGH)
    else:
        print("Turning off LED")
        GPIO.output(LED_PIN, GPIO.LOW)
 
# Keep the script running
input("Press Enter to exit...\n")