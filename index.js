const express = require("express");
const database = require("./database/index");
const shapeAI = express();
///
shapeAI.use(express.json());
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

shapeAI.listen(3000, () => console.log("server running!!!!"));
