// m101js week2 - Challenge Exercie: Arrays with Nested Documents

// Prompt:
/* Suppose our movie details documents are structured so that rather than 
 *contain an awards field that looks like this:
 */
    "awards" : {
        "wins" : 56,
        "nominations" : 86,
        "text" : "Won 2 Oscars. Another 56 wins and 86 nominations."
    }

// they are structured with an awards field as follows: 
    "awards" : {
        "oscars" : [
            {"award": "bestAnimatedFeature", "result": "won"},
            {"award": "bestMusic", "result": "won"},
            {"award": "bestPicture", "result": "nominated"},
            {"award": "bestSoundEditing", "result": "nominated"},
            {"award": "bestScreenplay", "result": "nominated"}
        ],
        "wins" : 56,
        "nominations" : 86,
        "text" : "Won 2 Oscars. Another 56 wins and 86 nominations."
    }

/*
 * Write a command that will return all documents in the movieDetails collection 
 * of the video database that were only nominated for best picture. 
 * Please assume you are already using the video database in the shell and 
 * write your command accordingly.
 */


// My response!

/* 
   ASSUMPTION: A request for those movies nominated for best picture should
               also return those that subsequently won best picture.
 */

// Response 1: Assuming that only want those documents that were only
//             nominated for 1 oscar, irrespective of total nominations
//             at other ceremonies.
db.movieDetailsScratch.find({ "awards.oscars": { $size: 1 }, 
                       "awards.oscars.award": "bestPicture" }).pretty();


// Response 2: Assuming that the restriction of "only nominated for best picture"
//             implies that the document received no other nominations at all
//             (a highly unlikely occurence, which might still be a query of
//             interest given how incredible it would be).
// Note that I believe the check for $size might be unnecessary as the
// check for a single nomination would imply that the awards.oscars array is at
// most length 1.
db.movieDetailsScratch.find({ "awards.nominations" : 1 , 
                              "awards.oscars": { $size: 1 },   
                              "awards.oscars.award": "bestPicture" }).pretty();

 // OR

db.movieDetailsScratch.find({ "awards.nominations": 1 ,  
                              "awards.oscars.award": "bestPicture" }).pretty();


db.movieDetailsScratch.find({
                              "awards.oscars" : { $size: 1} }).pretty();




