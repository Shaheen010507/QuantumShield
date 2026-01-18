from database.db import get_db_connection
from services.rbac import require_role
from services.xai_engine import generate_banker_xai


# =========================
# USER DASHBOARD
# =========================
def get_user_dashboard(user, user_id):
    # RBAC: only User role
    allowed, msg = require_role(user, ["User"])
    if not allowed:
        return {"error": msg}, 403

    # Ownership check
    if user["id"] != user_id:
        return {"error": "You cannot access other user's data"}, 403

    conn = get_db_connection()
    cur = conn.cursor()

    # User profile
    cur.execute("""
        SELECT id, name, username, email, role, last_login
        FROM users
        WHERE id = %s
    """, (user_id,))
    user_data = cur.fetchone()

    # User transactions
    cur.execute("""
        SELECT id, amount, transaction_type, risk_score, status,
               decision_reason, created_at
        FROM transactions
        WHERE user_id = %s
        ORDER BY created_at DESC
    """, (user_id,))
    transactions = cur.fetchall()

    # Summary
    cur.execute("""
        SELECT status, COUNT(*) AS count
        FROM transactions
        WHERE user_id = %s
        GROUP BY status
    """, (user_id,))
    summary_rows = cur.fetchall()

    summary = {row["status"]: row["count"] for row in summary_rows}

    cur.close()
    conn.close()

    return {
        "user": user_data,
        "summary": summary,
        "transactions": transactions
    }, 200


# =========================
# BANKER DASHBOARD (XAI)
# =========================
def get_banker_dashboard(user):
    allowed, msg = require_role(user, ["Banker"])
    if not allowed:
        return {"error": msg}, 403

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT id, user_id, amount, device_id, ip_address,
               risk_score, status, transaction_type, created_at
        FROM transactions
        WHERE status IN ('FLAGGED', 'BLOCKED')
        ORDER BY created_at DESC
    """)
    transactions = cur.fetchall()

    # XAI pattern extraction
    xai_patterns = generate_banker_xai(transactions)

    cur.close()
    conn.close()

    return {
        "flagged_transactions": len(transactions),
        "xai_patterns": xai_patterns,
        "transactions": transactions
    }, 200


# =========================
# ORGANIZATION DASHBOARD
# =========================
def get_organization_dashboard(user):
    allowed, msg = require_role(user, ["Organization"])
    if not allowed:
        return {"error": msg}, 403

    conn = get_db_connection()
    cur = conn.cursor()

    # All users
    cur.execute("""
        SELECT id, name, username, email, role, last_login
        FROM users
        ORDER BY id
    """)
    users = cur.fetchall()

    # All transactions
    cur.execute("""
        SELECT id, user_id, amount, risk_score, status,
               transaction_type, created_at
        FROM transactions
        ORDER BY created_at DESC
    """)
    transactions = cur.fetchall()

    # Fraud summary
    cur.execute("""
        SELECT status, COUNT(*) AS count
        FROM transactions
        WHERE status IN ('FLAGGED', 'BLOCKED')
        GROUP BY status
    """)
    fraud_rows = cur.fetchall()

    fraud_summary = {row["status"]: row["count"] for row in fraud_rows}

    cur.close()
    conn.close()

    return {
        "total_users": len(users),
        "total_transactions": len(transactions),
        "fraud_summary": fraud_summary,
        "users": users,
        "transactions": transactions
    }, 200
