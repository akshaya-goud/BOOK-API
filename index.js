require("dotenv").config();

// framework
const express = require("express");
const mongoose = require("mongoose");

// database
const database = require("./database/index");

// models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

//initializing express
const shapeAI = express();

///
shapeAI.use(express.json());

/// establish database connection
mongoose
.connect(process.env.MONGO_URL,{
     useNewUrlParser: true,
     useUnifiedTopology: true,
    
    }
)
.then(() => console.log("connection established!!!!!!"));


///
shapeAI.get("/", async (req,res) => {
    const getAllBooks =await BookModel.find();
    console.log(getAllBooks);
    return res.json(getAllBooks);
});

///
shapeAI.get("/is/:isbn", async (req,res) => {
    const getSpecificBook =  await BookModel.findOne({ISBN: req.params.isbn }) 
     if(!getSpecificBook) {
         return res.json({error:`No book found for the ISBN of ${req.params.isbn}`,});
     }
     return res.json({ book: getSpecificBook});
});

///
shapeAI.get("/c/:category", async (req,res) => {
    const getSpecificBooks = await BookModel.findOne({category: req.params.category });

     if(!getSpecificBooks) {
         return res.json({error:`No book found for the category of ${req.params.category}`,});
     }
     return res.json({ book: getSpecificBooks});
});

///
shapeAI.get("/author", async (req,res) => {
    const getAllAuthors = await AuthorModel.findOne();
     return res.json({authors: getAllAuthors});
});

///
shapeAI.get("/author/:name", async (req,res) => {
    const getSpecificAuthors = await AuthorModel.findOne({name:req.params.name});

     if(!getSpecificAuthors) {
         return res.json({error:`No book found for the author of ${req.params.name}`,});
     }
    return res.json({authors: getSpecificAuthors});
});

///
shapeAI.get("/publications", (req,res) => {
    
    return res.json({ publications: database.publications });
});

///
shapeAI.post("/book/new", async (req,res) => {
   const{ newBook } = req.body;

   const addNewBook = BookModel.create(newBook);

   return res.json({message:"book was added!"});
});
///
shapeAI.post("/author/new", async(req,res) => {
    const{ newAuthor } = req.body;
     const addNewAuthor = AuthorModel.create(newAuthor);
    return res.json({Authors: addNewAuthor, message:"author was added!"});
 });
 ///
shapeAI.put("/book/update/:isbn",(req,res) => {
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn) {
            book.title = req.body.bookTitle;
            return;
        }
    });
    return res.json({ books: database.books });
 });    
///
shapeAI.put("/book/author/update/:isbn",(req,res) => {
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn) 
            return book.authors.push(req.body.newAuthor);
    });
    database.authors.forEach((author) =>{
        if (author.id === req.body.newAuthor)
        return author.books.push(req.params.isbn);
    })
    return res.json({ books: database.books, authors: database.authors,
                      message:"New Author was added" });
 });    
 ///
 shapeAI.post("/publication/new",(req,res) => {
    const{ newPublication } = req.body;
    PublicationModel.create(newPublication);
    return res.json({message:"publication was added!"});
 });
 ///
 shapeAI.put("/publication/update/book/:isbn",(req,res) => {
    database.publications.forEach((publication) => {
        if(publication.id === req.body.pubId) {
            return publication.books.push(req.params.isbn);
        }
    });
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn){
            book.publication = req.body.pubId;
            return;
        }
 });
 return res.json({ books: database.books, publications: database.publication,
    message:"successfully updated publication" });
});
///
shapeAI.delete("/book/delete/:isbn",(req,res) => {
    const updateBookDatabase = database.books.filter(
        (book) => book.ISNB !== req.params.isbn);
    database.books = updateBookDatabase; 
    return res.json({ books: database.books });
 });    
 ///
 shapeAI.delete("/book/delete/author/:isbn/:authorId",(req,res) => {
   
    database.books.forEach((book) => {
      if (book.ISBN === req.params.isbn){
          const newAuthorList = book.authors.filter(
              (author) => author !== parseInt(req.params.authorId)
          );
      book.authors = newAuthorList;
      return;
          }
        });
        database.authors.forEach((author)=> {
            if (author.id === parseInt(req.params.authorId)) {
                const newBookList = author.books.filter(
                    (book) => book.ISBN !== req.params.isbn
                    );

                    author.books = newBookList;
                    return;
            }
        });
        return res.json({
            book: database.books,
            author: database.authors,
            message:"author was deleted!!!!!",
        });
    });  
///
shapeAI.delete("/publication/delete/book/:isbn/:pubId",(req,res) => {
   
    database.publications.forEach((publication) => {
      if (publication.id === parseInt(req.params.pubId)){
          const newBooksList = publication.books.filter(
              (book) => book !== req.params.isbn
          );
      publication.books = newBooksList;
      return;
          }
        });
        database.books.forEach((book)=> {
            if (book.ISBN === req.params.isbn) {
                    book.publication = 0 ;
                    return;
            }
        });
        return res.json({
            book: database.books,
            publications: database.publications,
            message:"author was deleted!!!!!",
        });
    });  
shapeAI.listen(3000, () => console.log("server running!!!!"));
///


