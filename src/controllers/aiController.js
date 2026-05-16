const diagnoseDisease = async (req, res) => {
    try {

        const { image } = req.body;

        setTimeout(() => {

            res.json({
                disease: 'Leaf Blight',
                severity: 'Medium',
                recommendation: 'Apply fungicide spray'
            });

        }, 1500);

    } catch (error) {

        res.status(500).json({
            error: 'Diagnosis failed'
        });

    }
};

const consultAI = async (req, res) => {

    try {

        const { message } = req.body;

        res.json({
            response: `AI response for: ${message}`
        });

    } catch (error) {

        res.status(500).json({
            error: 'Consultation failed'
        });

    }
};

module.exports = {
    diagnoseDisease,
    consultAI
};