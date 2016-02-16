// homework6_3.js

// For companies in our collection founded in 2004 and having 5 or more rounds of funding, 
// calculate the average amount raised in each round of funding. 
// Which company meeting these criteria raised the smallest average amount of money per 
// funding round? You do not need to distinguish between currencies. 

// Write an aggregation query to answer this question.
db.companies.aggregate([
    { $match: { 
        founded_year: 2004,
        funding_rounds: { $ne: null }
    } },
    { $project: {
        _id: 0,
        name: 1,
        funding_rounds: 1,
        total_rounds: { $size: "$funding_rounds" }
    } },
    { $match: { total_rounds: { $gte: 5 } } },
    { $project: {
        name: 1,
        avg_round: { $avg: "$funding_rounds.raised_amount" }
    } },
    { $sort: { avg_round: 1 } },
    { $limit: 1 }
]).pretty();