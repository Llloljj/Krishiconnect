const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- KISAN MADAD: AI Intelligence Hub (NVIDIA NIM Proxy) ---

// 1. Crop Disease Diagnosis Endpoint
app.post('/api/ai/diagnose', async (req, res) => {
    const { image } = req.body;
    
    // Simulate NVIDIA NIM Vision Processing
    console.log("🚀 [AI] Processing Crop Scan...");
    
    setTimeout(() => {
        res.json({
            disease: "Late Blight (Phytophthora infestans)",
            severity: "CRITICAL",
            confidence: 0.98,
            recommendation: "Apply Copper-based Fungicide immediately. 200ml/acre pulse required.",
            recovery_chance: "75%"
        });
    }, 2000);
});

// 2. AI Agronomist Consultation Endpoint
app.post('/api/ai/consult', async (req, res) => {
    const { message } = req.body;
    
    // Simulate NVIDIA NIM Llama-3-70B reasoning
    console.log(`🧠 [AI] Analyzing Consultation: "${message}"`);
    
    setTimeout(() => {
        res.json({
            response: "Based on current soil moisture (64%) and temp (28°C), I recommend initiating the irrigation pulse in 2 hours to avoid peak evaporation. Your Northern block is showing optimal nutrient absorption.",
            waveform_data: [40, 80, 100, 60, 40]
        });
    }, 1500);
});

// --- KISAN MADAD: Drone Telemetry Hub (Autonomous Swarm Control) ---

let missionState = {
    active: false,
    battery: 100,
    payload: 100,
    altitude: 0,
    drones: [
        { id: 'DRN-01', x: 20, y: 30, status: 'docked' },
        { id: 'DRN-02', x: 45, y: 15, status: 'docked' },
        { id: 'DRN-03', x: 70, y: 50, status: 'docked' }
    ]
};

app.get('/api/drone/status', (req, res) => {
    if (missionState.active) {
        missionState.battery -= 0.5;
        missionState.payload -= 0.2;
        missionState.altitude = 15; // Flight altitude in meters
        missionState.drones = missionState.drones.map(d => ({
            ...d,
            x: d.x + (Math.random() - 0.5) * 5,
            y: d.y + (Math.random() - 0.5) * 5,
            status: 'active'
        }));
    }
    res.json(missionState);
});

app.post('/api/drone/launch', (req, res) => {
    const { type } = req.body;
    console.log(`🚁 [DRONE] Launching Swarm for ${type} mission...`);
    missionState.active = true;
    res.json({ status: "SUCCESS", message: "Swarm deployed. ETA Sector-4: 45 seconds." });
});

// Fallback for SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 KISAN MADAD v2.0 running on http://localhost:${PORT} [18:00:00]`);
    console.log(`🤖 AI Intelligence Hub: Active`);
});
