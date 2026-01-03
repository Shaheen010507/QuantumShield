# backend/controllers/transaction_controller.py
"""
from database.db import get_db_connection
from services.zero_trust_engine import zero_trust_validate

def create_transaction(user, payload):
    # Zero Trust check
    allowed, msg = zero_trust_validate(user)
    if not allowed:
        return {"error": msg}, 403

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute(##
        INSERT INTO transactions
        (user_id, amount, transaction_type, device_id, ip_address, location,
         risk_score, fraud_probability, status)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)
        RETURNING *
    , (
        user["id"],
        payload["amount"],
        payload["transaction_type"],
        payload.get("device_id"),
        payload.get("ip_address"),
        payload.get("location"),
        0,          # risk_score placeholder
        0.0,        # fraud_probability placeholder
        "ALLOWED"   # default decision
    ))

    transaction = cur.fetchone()
    conn.commit()

    cur.close()
    conn.close()

    return transaction, 201"""


##new 

from database.db import get_db_connection
from services.zero_trust_engine import zero_trust_validate
from services.risk_scoring_engine import calculate_risk

def create_transaction(user, payload):
    # Zero Trust check
    allowed, msg = zero_trust_validate(user)
    if not allowed:
        return {"error": msg}, 403

    # Calculate risk score & status
    risk_score, status = calculate_risk(payload)

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO transactions
        (user_id, amount, transaction_type, device_id, ip_address, location,
         risk_score, fraud_probability, status)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)
        RETURNING *
    """, (
        user["id"],
        payload["amount"],
        payload["transaction_type"],
        payload.get("device_id"),
        payload.get("ip_address"),
        payload.get("location"),
        risk_score,
        0.0,       # fraud_probability (ML next)
        status
    ))

    transaction = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()

    return transaction, 201

