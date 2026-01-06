def generate_decision_reason(payload, risk_score, status):
    reasons = []

    if payload.get("amount", 0) > 30000:
        reasons.append("High transaction amount")

    if payload.get("location") not in ["India", "Local"]:
        reasons.append("Unusual transaction location")

    if risk_score > 70:
        reasons.append("High calculated risk score")

    if not reasons:
        reasons.append("Transaction behavior within normal limits")

    return " | ".join(reasons)
def generate_banker_xai(transactions):
    """
    Generate pattern-level explanations for banker dashboard
    """

    patterns = {
        "High Amount Transactions": 0,
        "Foreign IP Transactions": 0,
        "Unknown Device Transactions": 0,
        "High Risk Score (>70)": 0
    }

    for tx in transactions:
        if tx["amount"] and float(tx["amount"]) > 10000:
            patterns["High Amount Transactions"] += 1

        if tx["ip_address"] and not tx["ip_address"].startswith("192.168"):
            patterns["Foreign IP Transactions"] += 1

        if not tx["device_id"]:
            patterns["Unknown Device Transactions"] += 1

        if tx["risk_score"] and tx["risk_score"] >= 70:
            patterns["High Risk Score (>70)"] += 1

    return patterns
