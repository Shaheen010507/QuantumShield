# backend/services/xai_engine.py

def generate_decision_reason(payload, risk_score, status, ml_probability=None):
    reasons = []

    if payload.get("amount", 0) > 10000:
        reasons.append("High transaction amount")

    if not payload.get("device_id"):
        reasons.append("Unknown device")

    if payload.get("ip_address") and not payload["ip_address"].startswith("192.168"):
        reasons.append("Foreign IP address")

    if payload.get("location") and payload["location"].lower() not in ["india", "local"]:
        reasons.append("Unusual transaction location")

    if risk_score >= 70:
        reasons.append("High calculated risk score")

    if ml_probability is not None:
        if ml_probability > 0.8:
            reasons.append("ML model predicts high fraud probability")
        elif ml_probability > 0.5:
            reasons.append("ML model predicts moderate fraud probability")

    if not reasons:
        return "Transaction behavior within normal limits"

    return " | ".join(reasons)


# ✅ NEW: Banker-level XAI aggregation
def generate_banker_xai(transactions):
    patterns = {
        "High Amount Transactions": 0,
        "Foreign IP Transactions": 0,
        "Unknown Device Transactions": 0,
        "High Risk Score (>70)": 0
    }

    for tx in transactions:
        if float(tx["amount"]) > 10000:
            patterns["High Amount Transactions"] += 1

        if tx.get("ip_address") and not tx["ip_address"].startswith("192.168"):
            patterns["Foreign IP Transactions"] += 1

        if not tx.get("device_id"):
            patterns["Unknown Device Transactions"] += 1

        if tx.get("risk_score", 0) >= 70:
            patterns["High Risk Score (>70)"] += 1

    return patterns
