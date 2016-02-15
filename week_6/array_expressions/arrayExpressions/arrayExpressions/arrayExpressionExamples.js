// array expresions
//
// particularly in project stage

// $ filter - select a subset of the elements in an array
//            based on a certain filter.

// $arrayElemAt - pull out a specific element

// $slice - get a slice of an array

// $size - returns length of the array.


// $ filter example -
//      input - the array to use (can also be array literal)
//      as    - needed as we may have specified an anonymous array literal
//      cond  - filter
//              $$ dereference a variable that is defined in this
//                 expression
//            - helps to distinguish between variables specified
//              in this stage (e.g. in "as") vs actual field values.
db.companies.aggregate([
    { $match: {"funding_rounds.investments.financial_org.permalink": "greylock" } },
    { $project: {
        _id: 0,
        name: 1,
        founded_year: 1,
        rounds: { $filter: {
            input: "$funding_rounds",
            as: "round",
            cond: { $gte: ["$$round.raised_amount", 100000000] } } }
    } },
    { $match: {"rounds.investments.financial_org.permalink": "greylock" } },    
]).pretty()




// $arrayElemAt
//
//   specify a value for the elements to be assigned to,
//   specify the element to be pulled out (can use negative index)
db.companies.aggregate([
    { $match: { "founded_year": 2010 } },
    { $project: {
        _id: 0,
        name: 1,
        founded_year: 1,
        first_round: { $arrayElemAt: [ "$funding_rounds", 0 ] },
        last_round: { $arrayElemAt: [ "$funding_rounds", -1 ] }
    } }
]).pretty()


// $slice - can also be used for arrayElemAt
//
//    if value is +: give me that many starting at the beginning
//    if value is -: give me that many starting from the end. 
db.companies.aggregate([
    { $match: { "founded_year": 2010 } },
    { $project: {
        _id: 0,
        name: 1,
        founded_year: 1,
        first_round: { $slice: [ "$funding_rounds", 1 ] },
        last_round: { $slice: [ "$funding_rounds", -1 ] }
    } }
]).pretty()


// $slice
//
// begin at index 1 and take the next 3
db.companies.aggregate([
    { $match: { "founded_year": 2010 } },
    { $project: {
        _id: 0,
        name: 1,
        founded_year: 1,
        early_rounds: { $slice: [ "$funding_rounds", 1, 3 ] }
    } }
]).pretty()



db.companies.aggregate([
    { $match: { "founded_year": 2004 } },
    { $project: {
        _id: 0,
        name: 1,
        founded_year: 1,
        total_rounds: { $size: "$funding_rounds" }
    } }
]).pretty()



    

