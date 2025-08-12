# Fokus "How it works" — Pro Bundle

This is a richer, Cluely-like scrollytelling animation built from scratch for Fokus.
- Pinned mock window with animated UI for 4 steps
- Right-side copy that highlights as you scroll
- No new npm packages; Tailwind-only; Vercel-ready

## Files
- components/ScrollShowcasePro.tsx
- app/how-it-works/page.tsx
- components/HomeShowcase.tsx (optional: include on homepage)

## Usage
1) Drop the files into your repo at the same paths.
2) To add the section on your homepage, import and place `<HomeShowcase />` under the hero:
   ```tsx
   import HomeShowcase from "@/components/HomeShowcase";
   // ...
   <HomeShowcase />
   ```
3) Deploy. You now have a branded, animated "How it works" section and a standalone `/how-it-works` page.

## Customize
- Edit the `STEPS` array for copy.
- Adjust colors to match your Tailwind theme.
- Replace the mock UI blocks with real screenshots/video if you prefer.
