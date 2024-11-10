const Transaction = require('../models/Transaction');

const listTransaction = async (req, res) => {
   
    const { month, search = ' ', page = 1, perPage = 10, price  } = req.query;

    console.log(month, search, page, perPage);  // debug

    // Filter by month
    const monthFilter = month
        ? {
            $expr: {
                $eq: [
                    { $month: "$dateOfSale" }, new Date(`${month} 1, 2024`).getMonth() + 1
                ]
            }
        }
        : {};

    // Search filter
    const searchFilter = search
        ? {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                // { price: { $regex: search, $options: 'i' } }
            ]
        }
        : {};

        const priceFilter = price && !isNaN(price) ? { price: Number(price) } : {};
    try {
        const transaction = await Transaction.find({ ...monthFilter, ...searchFilter,...priceFilter })
            .skip((page - 1) * perPage)
            .limit(parseInt(perPage));

        res.json(transaction); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { listTransaction };
