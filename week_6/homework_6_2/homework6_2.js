// homework6_2.js

//  There are documents for each student (student_id) across a variety of classes (class_id). 
//  Note that not all students in the same class have the same exact number of assessments. 
//  Some students have three homework assignments, etc.

//  Your task is to calculate the class with the best average student performance. 
//  This involves calculating an average for each student in each class of all non-quiz 
//  assessments and then averaging those numbers to get a class average. 
//  To be clear, each student's average should include only exams and homework grades. 
//  Don't include their quiz scores in the calculation. 


db.grades.aggregate( [
    { $match: { "scores": { $ne: null } } },
    { $project: {
        _id: 0,
        student_id: 1,
        class_id: 1,
        scores: { $filter: {
            input: "$scores",
            as: "score",
            cond: { $ne: [ "$$score.type", "quiz" ] } } } 
    } },
    { $project: {
        student_id: 1,
        class_id: 1,
        avg_score: { $avg: "$scores.score" }
    } },
    { $group: {
        _id: "$class_id",
        avg_student_score: { $avg: "$avg_score" }
    } },
    { $sort: { "avg_student_score": -1 } }
] );