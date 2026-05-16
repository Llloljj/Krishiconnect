---
phase: 1
plan: 1
wave: 1
depends_on: []
files_modified:
  - s:\anti gravity\KISAN MADAD\server.js
  - s:\anti gravity\KISAN MADAD\supabase_schema.sql
  - s:\anti gravity\KISAN MADAD\public\index.html
autonomous: true
must_haves:
  truths:
    - "Express server runs on port 3000"
    - "Supabase schema includes role-based profiles"
  artifacts:
    - "s:\anti gravity\KISAN MADAD\server.js exists"
    - "s:\anti gravity\KISAN MADAD\public\index.html exists"
---

# Plan 1.1: NIM-Powered Foundation

<objective>
Establish a high-performance, NIM-ready foundation for KISAN MADAD v2.0. This includes the core backend server, the database schema, and the initial premium landing page.
</objective>

<context>
Load for context:
- s:\anti gravity\KISAN MADAD\.gsd\ARCHITECTURE.md
- s:\anti gravity\KISAN MADAD\chatlog.md
</context>

<tasks>

<task type="auto">
  <name>Initialize Core Server & Schema</name>
  <files>
    - s:\anti gravity\KISAN MADAD\server.js
    - s:\anti gravity\KISAN MADAD\supabase_schema.sql
  </files>
  <action>
    Create a lean Express server with static file serving and a status API. 
    Define the Supabase schema with `profiles`, `requirements`, `farm_details`, and `matches` tables.
    AVOID: Adding complex auth logic yet - keep it foundational for Wave 1.
  </action>
  <verify>
    node server.js runs without errors; 
    Check http://localhost:3000/api/status returns "Operational"
  </verify>
  <done>
    Server is operational and schema is documented.
  </done>
</task>

<task type="auto">
  <name>Deploy Glassmorphic Identity</name>
  <files>
    - s:\anti gravity\KISAN MADAD\public\index.html
    - s:\anti gravity\KISAN MADAD\public\style.css
  </files>
  <action>
    Implement a premium "Electric Neon" landing page with a glassmorphic hero section. 
    Use the colors: #00ff88 (Primary) and #0a0a0a (BG).
    AVOID: Using placeholders; use high-impact copy.
  </action>
  <verify>
    Visual verification of http://localhost:3000/
  </verify>
  <done>
    Landing page is live and aesthetic.
  </done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] Server running on 3000
- [ ] http://localhost:3000/api/status returns JSON
- [ ] Landing page matches the "Electric Neon" design tokens
</verification>

<success_criteria>
- [ ] All tasks verified
- [ ] Must-haves confirmed
</success_criteria>
