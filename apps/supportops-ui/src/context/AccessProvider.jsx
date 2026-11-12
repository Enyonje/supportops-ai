import React, { createContext, useContext, useMemo } from "react";
import { useAuth } from "./AuthContext";

const AccessContext = createContext(null);
const ACTIVE = new Set(["active", "trialing"]);

export function AccessProvider({ children }) {
  const auth = useAuth();
  const value = useMemo(() => {
    const user = auth.user || {};
    const workspace = auth.workspace || {};
    const subscription = workspace.subscription || user.subscription || {};
    const status = String(subscription.status || workspace.subscriptionStatus || user.subscriptionStatus || "").toLowerCase();
    const subscribed = ACTIVE.has(status);
    const role = String(user.role || "guest").toLowerCase();
    const permissions = Array.isArray(user.permissions) ? user.permissions : [];
    const limits = workspace.limits || subscription.limits || {};
    const hasRole = (roles) => (Array.isArray(roles) ? roles : [roles]).some((r) => String(r).toLowerCase() === role);
    const hasPermission = (permission) => role === "admin" || role === "super admin" || permissions.includes(permission);
    const can = hasPermission;
    return { user, workspace, role, plan: subscription.plan || workspace.plan || user.plan || "free", status, subscribed, isSubscribed: subscribed, limits: { seats: limits.seats ?? limits.maxSeats ?? null, ...limits }, hasRole, hasPermission, can, canAccess: ({ permission, roles } = {}) => (permission ? hasPermission(permission) : roles ? hasRole(roles) : subscribed), loading: auth.loading, error: null, refresh: auth.refreshSession, refetch: auth.refreshSession };
  }, [auth]);
  return <AccessContext.Provider value={value}>{children}</AccessContext.Provider>;
}
export function useAccess() { const value = useContext(AccessContext); if (!value) throw new Error("useAccess must be used within SupportOps AccessProvider"); return value; }
export const useApp = useAccess;
export default AccessProvider;
