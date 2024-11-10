const Transaction = require('../models/Transaction');

const getStatistics = async (req,res)=>{
const {month} = req.query;


const monthFilter =  month ?
                                {
                                    $expr : {
                                        $eq : [{$month: '$dataOfSale' },new Date(`${month} 1, 2024`).getMonth()+1 ]
                                                }
                                } : { }  ;
try{
               const totalSales = await Transaction.aggregate([
                {$match: {...monthFilter, sold: true}},
                {$group: {_id: null, totalSales: {$sum: '$price'}, soldItems: {$sum: 1}}},
               ]);
               
               const unsoldItems = await Transaction.countDocuments({...monthFilter, sold: false});
 res.json({
    totalSales: totalSales[0]?.totalSales || 0,
    soldItems: totalSales[0]?.soldItems || 0,
    unsoldItems
 });
} catch(error){
    console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};



module.exports = { getStatistics };