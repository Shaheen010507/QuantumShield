import random

def predict_fraud(features):
    """
    Temporary ML model (Rule-based placeholder)
    Replaced later with trained ML & QSVM
    """

    risk_score = features.get("risk_score", 0)
    amount = features.get("amount", 0)

    if risk_score > 70 or amount > 30000:
        fraud_prob = round(random.uniform(0.75, 0.95), 2)
    else:
        fraud_prob = round(random.uniform(0.05, 0.3), 2)

    return fraud_prob, "Baseline-ML"
