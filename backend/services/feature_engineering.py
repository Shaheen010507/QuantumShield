import math
from datetime import datetime

def extract_features(user, transaction):
    """
    Converts raw transaction data into ML/QSVM-ready features
    """

    amount = float(transaction.get("amount", 0))
    device_id = transaction.get("device_id")
    ip_address = transaction.get("ip_address")
    location = transaction.get("location")

    # Feature 1: Log-scaled amount
    amount_log = math.log1p(amount)

    # Feature 2: High amount flag
    high_amount_flag = 1 if amount > 10000 else 0

    # Feature 3: Foreign IP
    is_foreign_ip = 1 if location and location != "India" else 0

    # Feature 4: Device novelty
    known_devices = user.get("known_devices", [])
    is_new_device = 0 if device_id in known_devices else 1

    # Feature 5: Hour of transaction
    hour_of_day = datetime.utcnow().hour

    features = {
        "amount_log": amount_log,
        "high_amount_flag": high_amount_flag,
        "is_foreign_ip": is_foreign_ip,
        "is_new_device": is_new_device,
        "hour_of_day": hour_of_day
    }

    return features
