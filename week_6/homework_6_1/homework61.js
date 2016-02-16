
// Prompt: Write an aggregation query that will determine the number
//         of unique companies with which an individual has been associated.
db.companies.aggregate( [
    { $match: { "relationships.person": { $ne: null } } },
    { $project: { 
    	relationships: 1,
    	company_name: "$name",
    	_id: 0 
    } },
    { $unwind: "$relationships" },
    { $group: {
        _id: {person: "$relationships.person"},
        unique_companies: {$addToSet: "$company_name"}
    } },
    { $project: {
        _id: 1,
        unique_companies_count: {$size: "$unique_companies"}
    } },
    { $sort: { unique_companies_count: -1 } }
] )