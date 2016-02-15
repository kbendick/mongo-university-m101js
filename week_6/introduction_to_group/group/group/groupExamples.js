// $group - similar to SQL GROUP BY command
//
//      - in group stage, can aggregate together values in 
//         multiple documents
//
// _id field is fundamental to the group stage.
//    - how we define / control / tune how the group
//      stages organizes the documents into groups.



//    - in this case, $avg will calculate an average
//      for # of employees for all documents grouped by
//      founded year.
db.companies.aggregate([
    { $group: {
        _id: { founded_year: "$founded_year" },
        average_number_of_employees: { $avg: "$number_of_employees" }
    } },
    { $sort: { average_number_of_employees: -1 } }
    
])


// doesnt use $group, we were just further exploring the data
db.companies.aggregate( [
    { $match : { founded_year : 2001 } },
    { $project : { _id: 0, name : 1, number_of_employees: 1 } },
    { $sort : { number_of_employees : -1 } }
] )


// match on relationships.person.
db.companies.aggregate( [
    { $match: { "relationships.person": { $ne: null } } },
    { $project: { relationships: 1, _id: 0 } },
    { $unwind: "$relationships" },
    { $group: {
        _id: "$relationships.person",
        count: { $sum: 1 }
    } },
    { $sort: { count: -1 } }
] )

