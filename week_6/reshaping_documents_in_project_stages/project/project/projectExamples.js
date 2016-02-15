// Project stage can be used to reshape a document, in addition to
// the typical usage of removing fields.


// "promoting nested fields" to the top level document
//
// note that funders actually returns all matches in an array of arrays
//  where the larger array contains all matching elements and each
//  subarray is the funders for a particular round of funding.
db.companies.aggregate([
    { $match: {"funding_rounds.investments.financial_org.permalink": "greylock" } },
    { $project: {
        _id: 0, 
        name: 1,
        ipo: "$ipo.pub_year",
        valuation: "$ipo.valuation_amount",
        funders: "$funding_rounds.investments.financial_org.permalink"
    } }
]).pretty()


// Constructing a new document (nested in this case) with fields
// from the matched documents
db.companies.aggregate([
    { $match: {"funding_rounds.investments.financial_org.permalink": "greylock" } },
    { $project: {
        _id: 0, 
        name: 1,
        founded: {
            year: "$founded_year",
            month: "$founded_month",
            day: "$founded_day"
        }
    } }
]).pretty()


db.companies.aggregate([
    { $match: {"funding_rounds.investments.financial_org.permalink": "greylock" } },
    { $project: {
        _id: 0, 
        name: 1,
        people: "$relationships.person.last_name"
    } }
]).pretty()
     


