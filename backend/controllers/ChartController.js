const Transaction = require('../models/Transaction'); 



const getBarChartData= async(req,res)=>{
    const{month}=req.query;
    const monthFilter = month ? 
                                     {$expr: {
                                        $eq: [{$month: '$dateOfSale'},new Date(`${month} 1, 2024`).getMonth()+1] 
                                     }
                                    }:{ };

        const priceRanges =[

            {range: '0-100' , min:0 , max :100 },
            {range: '101-200' , min:101 , max :200 },
            {range: '201-300' , min:201 , max :300 },
            {range: '301-400' , min:301, max :400 },
            {range: '401-500' , min:401, max :500 },
            {range: '501-600' , min:501 , max :600 },
            {range: '601-700' , min:601 , max :700 },
            {range: '701-800' , min:701 , max :800 },
            {range: '801-900' , min:801 , max :900 },
            { range: '901-above', min: 901, max: Infinity }
        ];

        const data = await Promise.all(
            priceRanges.map(async({range,min,max}) =>{
                const count = await Transaction.countDocuments({
                    ...monthFilter,
                //     price: {$gate: min, $lt: max },
                // });
                price: { $gte: parseInt(min, 10), $lt: max === Infinity ? Infinity : parseInt(max, 10) }
            });
                return {range, count };
            })
        );

        res.json(data);


}

const listTransactions = async (req, res) => {
    // Your function code here
};

module.exports = { getBarChartData };