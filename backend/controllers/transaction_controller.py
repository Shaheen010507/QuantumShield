from database.db import get_db_connection
from services.zero_trust_engine import zero_trust_validate
from services.risk_scoring_engine import calculate_risk
from services.xai_engine import generate_decision_reason

def create_transaction(user, payload):
    # 1. Zero Trust
    allowed, msg = zero_trust_validate(user)
    if not allowed:
        return {"error": msg}, 403

    # 2. Risk scoring
    risk_score, status = calculate_risk(payload)

    # 3. XAI explanation ✅ (THIS WAS MISSING)
    decision_reason = generate_decision_reason(
        payload=payload,
        risk_score=risk_score,
        status=status
    )

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO transactions
        (user_id, amount, transaction_type, device_id, ip_address, location,
         risk_score, fraud_probability, status, decision_reason)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        RETURNING *
    """, (
        user["id"],
        payload["amount"],
        payload["transaction_type"],
        payload.get("device_id"),
        payload.get("ip_address"),
        payload.get("location"),
        risk_score,
        0.0,
        status,
        decision_reason
    ))

    transaction = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()

    return transaction, 201
