def require_role(user, allowed_roles):
    if not user:
        return False, "Authentication required"

    if user.get("role") not in allowed_roles:
        return False, "Access denied"

    return True, "Access granted"
