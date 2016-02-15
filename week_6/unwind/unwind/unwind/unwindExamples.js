// $unwind - allows us to take documents with input containing an array field
//           and produce as output one document for each element in the array.
//
//     produces an exact copy of each document received (same key/values for
//     each field), except the unwind field will be a single element from the
//     given array and a document for each element in the unwind array.

db.companies.aggregate([
    { $match: {"funding_rounds.investments.financial_org.permalink": "greylock" } },
    { $project: {
        _id: 0,
        name: 1,
        amount: "$funding_rounds.raised_amount",
        year: "$funding_rounds.funded_year"
    } }
])


// unwind
db.companies.aggregate([
    { $match: {"funding_rounds.investments.financial_org.permalink": "greylock" } },
    { $unwind: "$funding_rounds" },
    { $project: {
        _id: 0,
        name: 1,
        amount: "$funding_rounds.raised_amount",
        year: "$funding_rounds.funded_year"
    } }
])



// Add funder to output documents.
//
// Note that we're getting all the companies for which greylock participated
// in a funding round (but some of these funding rounds might not include
// greylock).
db.companies.aggregate([
    { $match: {"funding_rounds.investments.financial_org.permalink": "greylock" } },
    { $unwind: "$funding_rounds" },
    { $project: {
        _id: 0,
        name: 1,
        funder: "$funding_rounds.investments.financial_org.permalink",
        amount: "$funding_rounds.raised_amount",
        year: "$funding_rounds.funded_year"
    } }
])



// Add second unwind stage.
//
// Attempting to match documents where greylock appears in every funding
// round.
//
// The first match is important to filter the # of docs that we look at
// initially. This is shown in a later example....
db.companies.aggregate([
    { $match: {"funding_rounds.investments.financial_org.permalink": "greylock" } },
    { $unwind: "$funding_rounds" },
    { $unwind: "$funding_rounds.investments" },
    { $match: {"funding_rounds.investments.financial_org.permalink": "greylock" } },
    { $project: {
        _id: 0,
        name: 1,
        funder: "$funding_rounds.investments.financial_org.permalink",
        amount: "$funding_rounds.raised_amount",
        year: "$funding_rounds.funded_year"
    } },
])



// Distinguish individual funders from fundingOrganization.
db.companies.aggregate([
    { $match: {"funding_rounds.investments.financial_org.permalink": "greylock" } },
    { $unwind: "$funding_rounds" },
    { $unwind: "$funding_rounds.investments" },
    { $project: {
        _id: 0,
        name: 1,
        individualFunder: "$funding_rounds.investments.person.permalink",
        fundingOrganization: "$funding_rounds.investments.financial_org.permalink",
        amount: "$funding_rounds.raised_amount",
        year: "$funding_rounds.funded_year"
    } },
])




// Move match stage after unwind stages -- inefficient.
db.companies.aggregate([
    { $unwind: "$funding_rounds" },
    { $unwind: "$funding_rounds.investments" },
    { $match: {"funding_rounds.investments.financial_org.permalink": "greylock" } },
    { $project: {
        _id: 0,
        name: 1,
        individualFunder: "$funding_rounds.investments.person.permalink",
        fundingOrganization: "$funding_rounds.investments.financial_org.permalink",
        amount: "$funding_rounds.raised_amount",
        year: "$funding_rounds.funded_year"
    } },
])




// Instead, use a second match stage.
db.companies.aggregate([
    { $match: {"funding_rounds.investments.financial_org.permalink": "greylock" } },
    { $unwind: "$funding_rounds" },
    { $unwind: "$funding_rounds.investments" },
    { $match: {"funding_rounds.investments.financial_org.permalink": "greylock" } },
    { $project: {
        _id: 0,
        name: 1,
        individualFunder: "$funding_rounds.investments.person.permalink",
        fundingOrganization: "$funding_rounds.investments.financial_org.permalink",
        amount: "$funding_rounds.raised_amount",
        year: "$funding_rounds.funded_year"
    } },
])




// Second unwind stage not strictly necessary 
db.companies.aggregate([
    { $match: {"funding_rounds.investments.financial_org.permalink": "greylock" } },
    { $unwind: "$funding_rounds" },
    { $match: {"funding_rounds.investments.financial_org.permalink": "greylock" } },
    { $project: {
        _id: 0,
        name: 1,
        individualFunder: "$funding_rounds.investments.person.permalink",
        fundingOrganization: "$funding_rounds.investments.financial_org.permalink",
        amount: "$funding_rounds.raised_amount",
        year: "$funding_rounds.funded_year"
    } }
])




// If we don't care about the funder we can simplify.
// Let's sort as well.
db.companies.aggregate([
    { $match: {"funding_rounds.investments.financial_org.permalink": "greylock" } },
    { $unwind: "$funding_rounds" },
    { $match: {"funding_rounds.investments.financial_org.permalink": "greylock" } },
    { $project: {
        _id: 0,
        name: 1,
        amount: "$funding_rounds.raised_amount",
        year: "$funding_rounds.funded_year" } },
    { $sort: { year: 1 } }
])
