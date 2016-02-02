db.movieDetails.find({ genres: { $all: ["Comedy", "Crime", "Drama"] } }).pretty()

db.movieDetails.find({ countries: { $size: 1 } }).pretty()

boxOffice: [ { "country": "USA", "revenue": 41.3 },
             { "country": "Australia", "revenue": 2.9 },
             { "country": "UK", "revenue": 10.1 },
             { "country": "Germany", "revenue": 4.3 },
             { "country": "France", "revenue": 3.5 } ]

db.movieDetails.find({ boxOffice: { country: "UK", revenue: { $gt: 15 } } })

db.movieDetails.find({ boxOffice: {$elemMatch: { country: "UK", revenue: { $gt: 15 } } } })



// ASSUMPTION: A request for those movies nominated for best picture should
//             also return those that subsequently won best picture.
db.movieDetailsScratch.find( {$and : [ { "awards.oscars": { $size: 1 } }, 
	                 			{ "awards.oscars0": { "award": "bestPicture" } } ] });