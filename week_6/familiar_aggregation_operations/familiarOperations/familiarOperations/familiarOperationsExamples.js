// These familiar operations can all be performed using mongoshell, etc.
//
// They are necessary to perform the other analytics tasks that
// the aggregation framework is really necessary for.
//
// It might not be as efficient to do ONLY familiar operations vs.
// allowing the driver and the database to perform them in 
// their preferred order.... I don't know.

// In the Nodejs driver, sort skip and limit always occur in that order
// regardless of the order specified. Note that in the aggregation
// framework, sort skip and limit occur at the exact pipeline stage
// location you give them.



// Match - filter stage, query doc is very similar to find
db.companies.aggregate([
    { $match: { founded_year: 2004 } },
])


// Project - projection stage, works like with find.
//
// aggregate - pass an aggregation pipeline
//             each document specifies a stage
//             in the pipeline
db.companies.aggregate([
    { $match: { founded_year: 2004 } },
    { $project: {
        _id: 0,
        name: 1,
        founded_year: 1
    } }
])


// limit - works like in find.
//
// note that limit happens before projection, so as to not
// have to perform the project stage on all of the match
// results, only those that are absolutely necessary (e.g. the first 5).
db.companies.aggregate([
    { $match: { founded_year: 2004 } },
    { $limit: 5 },
    { $project: {
        _id: 0,
        name: 1 } }
])


// sort stage - sort works similar to find
//
// in this example, he uses limit AFTER sort so as to get the
// first 5 documents from the sort (e.g. alphanumeric order
//  by name in this example).
//
// contrast with below
db.companies.aggregate([
    { $match: { founded_year: 2004 } },
    { $sort: { name: 1} },
    { $limit: 5 },
    { $project: {
        _id: 0,
        name: 1 } }
])



// Take care with the order in which you specify sort skip and limit
db.companies.aggregate([
    { $match: { founded_year: 2004 } },
    { $limit: 5 },
    { $sort: { name: 1} },
    { $project: {
        _id: 0,
        name: 1 } }
])



// skip stage
db.companies.aggregate([
    { $match: { founded_year: 2004 } },
    { $sort: { name: 1} },
    { $skip: 10 },
    { $limit: 5 },
    { $project: {
        _id: 0,
        name: 1 } },
])

