//Requirements

// We are a company that handles a book publications
// Book
// ISBN, Title, Author [], Language, Pub Date, Num Page, Category[]

//Authors
//Name, Id, Books[]

//Publications
//Name, Id, Books[]

//Requirements

// -----------------------------------------------------------------------------------------

//Books

//We need an API

//GET
//to get all books
//to get specific book
//to get a list of books based on category
//to get a list of books based on author

//POST
//New Book

//PUT
//Update book details 
    // forEach directly modifies the array 
            //OR
    //map => new array => replace
//update/add new author

//DELETE
//delete a book
//delete an author from a book

// -----------------------------------------------------------------------------------------

// Author

//We need an API

//GET
//to get all authors
//to get specific author 
//to get a list of authors based on a book

//POST
//New author

//PUT
//Update Author name using id   [task]

//DELETE
//delete an author              [task]

// -----------------------------------------------------------------------------------------

// Publication

//We need an API

//GET
//to get all publications
//to get specific publication                       [task]
//to get a list of publications based on a book     [task]

//POST
//Add new publication

//PUT
//update publication name using id                  [task]
//update/add new book to an publication

//DELETE
//delete a book from publication
//delete a publication 




// Mongo is schemaless

// Mongoose helps you with validation, relationship with other data -> only for mongoDB

//model = document model for mongodb