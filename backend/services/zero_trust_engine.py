# backend/services/zero_trust_engine.py

def zero_trust_validate(user):
    """
    Zero Trust Rules:
    - User must be authenticated
    - Role must be valid
    """

    if not user:
        return False, "Unauthenticated access"

    if user.get("role") not in ["User", "Organization", "Banker"]:
        return False, "Invalid role"

    return True, "Access granted"
