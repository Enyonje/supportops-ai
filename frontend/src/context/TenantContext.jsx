import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api";

const TenantContext = createContext(null);

export const TenantProvider = ({ children }) => {
  const [branding, setBranding] = useState(null);

  useEffect(() => {
    api.get("/tenants/branding", {
      headers: {
        "X-Tenant-Domain": window.location.hostname
      }
    }).then(res => setBranding(res.data));
  }, []);

  if (!branding) return null;

  return (
    <TenantContext.Provider value={branding}>
      <style>
        {`:root {
          --primary: ${branding.primary_color};
          --accent: ${branding.accent_color};
        }`}
      </style>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => useContext(TenantContext);
