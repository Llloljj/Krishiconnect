# Phase 3: AI Intelligence Integration (NVIDIA NIM)

## User Review Required
> [!IMPORTANT]
> To enable real-world AI processing, we will integrate NVIDIA NIM APIs. This requires an API Key. For the demo, we will use a robust "Mock Intelligence" layer that mimics NIM's high-fidelity output until keys are provided.

## Open Questions
- Should we prioritize Image-to-Text (Disease Detection) or Text-to-Speech (Voice Assistant)? (Recommendation: Parallel implementation for maximum WOW factor).

## Proposed Changes

### [Backend] AI Proxy & Logic
#### [MODIFY] [server.js](file:///s:/anti%20gravity/KISAN%20MADAD/server.js)
- Implement `/api/ai/diagnose` endpoint.
- Implement `/api/ai/consult` endpoint.
- Integrate environment variable handling for AI Keys.

### [Frontend] AI Interaction
#### [MODIFY] [index.html](file:///s:/anti%20gravity/KISAN%20MADAD/public/index.html)
- Connect "Crop Scan" upload to the diagnosis endpoint.
- Connect "AI Assistant" mic/text input to the consultation engine.
- Implement real-time waveform feedback based on AI "Thinking" states.

## Verification Plan
### Automated Tests
- Mock NIM API response validation.
- End-to-end "Leaf Scan -> Diagnosis" flow test.

### Manual Verification
- Verify the AI "Waveform" reacts to the status of the AI request.
- Confirm that "Late Blight" diagnosis correctly populates the Health Card.
