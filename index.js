require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const database = require("./database/index");
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
shapeAI.get("/", (req,res) => {
    return res.json({ books: database.books });
});
///
shapeAI.get("/is/:isbn", (req,res) => {
    const getSpecificBook = database.books.filter((book) => book.ISBN === req.params.isbn);

     if(getSpecificBook.length === 0) {
         return res.json({error:`No book found for the ISBN of ${req.params.isbn}`,});
     }
     return res.json({ book: getSpecificBook});
});
///
shapeAI.get("/c/:category", (req,res) => {
    const getSpecificBooks = database.books.filter((book) => book.category.includes(req.params.category));

     if(getSpecificBooks.length === 0) {
         return res.json({error:`No book found for the category of ${req.params.category}`,});
     }
     return res.json({ book: getSpecificBooks});
});
///
shapeAI.get("/author", (req,res) => {
     return res.json({authors: database.authors});
});
///
shapeAI.get("/author/:name", (req,res) => {
    const getSpecificauthors = database.authors.filter((authors) => authors.name.includes(req.params.name));

     if(getSpecificauthors.length === 0) {
         return res.json({error:`No book found for the author of ${req.params.name}`,});
     }
    return res.json({authors: getSpecificauthors});
});
///
shapeAI.get("/publications", (req,res) => {
    
    return res.json({ publications: database.publications });
});
///
shapeAI.post("/book/new",(req,res) => {
   const{ newBook } = req.body;
   database.books.push(newBook);
   return res.json({ books: database.books,message:"book was added!"});
});
///
shapeAI.post("/author/new",(req,res) => {
    const{ newAuthor } = req.body;
    database.authors.push(newAuthor);
    return res.json({ authors: database.authors,message:"author was added!"});
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


