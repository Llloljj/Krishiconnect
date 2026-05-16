# Phase 2: Supabase Integration & Logic Layer

## User Review Required
> [!IMPORTANT]
> This phase will transition from static mock data to a live Supabase backend. Users will need to provide their Supabase URL and Anon Key if they wish to test on their own instances, otherwise, we will use a local/mocked implementation for validation.

## Open Questions
- Do we want to use Supabase Auth UI or a custom-styled form within our glassmorphic theme? (Recommended: Custom styled to match the aesthetic).

## Proposed Changes

### [Backend] Database Architecture
#### [NEW] [supabase_schema.sql](file:///s:/anti%20gravity/KISAN%20MADAD/supabase_schema.sql)
- Define `profiles` table (Farmer/Company roles).
- Define `fields` and `sensors` tables for telemetry.
- Define `contracts` table for the matching engine.
- Define `requirements` for companies.

### [Frontend] API Integration
#### [MODIFY] [index.html](file:///s:/anti%20gravity/KISAN%20MADAD/public/index.html)
- Inject Supabase client initialization.
- Replace hardcoded arrays in `FarmerDashboard`, `CompanyDashboard`, and `MatchingEngine` with `useEffect` data fetching hooks.
- Implement Login/Signup logic with Role-Based Access Control (RBAC).

## Verification Plan
### Automated Tests
- Validate schema migration success.
- Test Auth flow: Farmer signup -> Profile completion -> Dashboard access.
- Test Data flow: Company requirement post -> Matching engine update.

### Manual Verification
- Verify that "Arvind"'s profile data updates in real-time from the database.
- Confirm matching scores recalculate based on updated field stats.
