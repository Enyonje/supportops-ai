# SupportOps standalone frontend

This application is an independent Vite/React project. Deploy it as a separate Vercel project with the project Root Directory set to `apps/supportops-ui`.

## Build settings
- Framework preset: Vite
- Root Directory: `apps/supportops-ui`
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

## Environment
Set `VITE_SUPPORTOPS_API_URL` to the independently deployed SupportOps API base URL. Current repository defaults point to `https://supportops-ai.onrender.com`; verify that this service is the intended live SupportOps API before production deployment.

## Routes
Existing SupportOps route paths are preserved under `/supportops/*` for migration compatibility. Visiting the subdomain root redirects to `/supportops`.
