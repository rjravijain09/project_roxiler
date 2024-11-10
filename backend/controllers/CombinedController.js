const { listTransaction} = require('./TransactionController');
const { getStatistics } = require('./StatsContollers');
const { getBarChartData } = require('./ChartController');

const getCombinedData = async (req, res) => {
    try {
        const transactionData = await listTransaction(req, res);
        const statisticsData = await getStatistics(req, res);
        const chartData = await getBarChartData(req, res);

        res.json({ transactionData, statisticsData, chartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching combined data' });
    }
};

module.exports = { getCombinedData };
