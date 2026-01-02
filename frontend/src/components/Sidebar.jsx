import { Zap } from "lucide-react";
import { useTenant } from "../context/TenantContext";
import { useBranding } from "../context/BrandingContext";

export default function Sidebar() {
  const branding = useTenant();

  return (
    <aside
      className="w-64 p-6 border-r border-white/10"
      style={{ backgroundColor: "var(--accent)" }}
    >
      <div className="flex items-center gap-2 mb-10">
        {branding.logo ? (
          <img src={branding.logo} className="h-8" />
        ) : (
          <Zap style={{ color: "var(--primary)" }} />
        )}
        <span className="font-black text-xl text-white">
          {branding.company_name}
        </span>
      </div>
    </aside>
  );
}

export default function Sidebar() {
  const branding = useBranding();

  return (
    <div className="flex items-center gap-2">
      {branding?.logo_url ? (
        <img src={branding.logo_url} className="h-6" />
      ) : (
        <Zap className="text-[var(--primary-color)]" />
      )}

      <span className="font-black tracking-tight text-xl">
        {branding?.app_name || "SupportOps"}
      </span>

      {!branding?.white_label && (
        <span className="text-[10px] text-slate-400 uppercase">
          by SupportOps
        </span>
      )}
    </div>
  );
}
