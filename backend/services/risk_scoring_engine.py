# Risk Scoring Engine
# Calculates a risk score for a transaction based on simple rules (expandable later)

def calculate_risk(transaction):
    """
    Calculate risk score for a transaction.
    Returns:
        risk_score: int (0–100)
        status: 'ALLOWED', 'FLAGGED', 'BLOCKED'
    """

    risk_score = 0

    # Rule 1: Large amount
    if transaction["amount"] > 10000:
        risk_score += 50

    # Rule 2: Unknown device
    if not transaction.get("device_id"):
        risk_score += 20

    # Rule 3: Foreign IP (just example)
    if transaction.get("ip_address") and not transaction["ip_address"].startswith("192.168"):
        risk_score += 20

    # Rule 4: Suspicious location
    if transaction.get("location") and transaction["location"].lower() not in ["india", "local"]:
        risk_score += 10

    # Determine status
    if risk_score >= 70:
        status = "BLOCKED"
    elif risk_score >= 30:
        status = "FLAGGED"
    else:
        status = "ALLOWED"

    return risk_score, status
