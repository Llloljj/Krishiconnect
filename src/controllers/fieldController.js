const getFieldData = async (req, res) => {

    try {

        const { location } = req.params;

        res.json({
            location,
            temperature: '28°C',
            humidity: '65%',
            soil: 'Black Soil',
            rainfall: 'Moderate'
        });

    } catch (error) {

        res.status(500).json({
            error: 'Failed to fetch field data'
        });

    }
};

module.exports = {
    getFieldData
};