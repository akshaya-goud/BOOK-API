//Initializing Express Router
const Router = require("express").Router();

//Database Models

const PublicationModel = require("../../database/publication");

/*
Route             /publications
Description    get all publications
Access          Public
Parameters      none
Method          GET
*/
Router.get("/", (req, res) => {
    return res.json({ publications: database.publications });
  });
  
  
  /*
  Route             /publication/new
  Description    add new publication
  Access          Public
  Parameters      none
  Method          post
  */
  Router.post("/new", (req, res) => {
    const { newPublication } = req.body;
    PublicationModel.create(newPublication);
    return res.json({ message: "publication was added!" });
  });
  
  
  /*
  Route             /publication/update/book
  Description    update add new book to a publication
  Access          Public
  Parameters      isbn
  Method          put
  */
  Router.put("/update/book/:isbn", (req, res) => {
    database.publications.forEach((publication) => {
      if (publication.id === req.body.pubId) {
        return publication.books.push(req.params.isbn);
      }
    });
    database.books.forEach((book) => {
      if (book.ISBN === req.params.isbn) {
        book.publication = req.body.pubId;
        return;
      }
    });
    return res.json({
      books: database.books,
      publications: database.publication,
      message: "successfully updated publication",
    });
  });
  
  
  /*
  Route            publication/delete/book
  Description    delete a book from publication
  Access          Public
  Parameters      isbn,author id
  Method          delete
  */
  Router.delete("/delete/book/:isbn/:pubId", (req, res) => {
    database.publications.forEach((publication) => {
      if (publication.id === parseInt(req.params.pubId)) {
        const newBooksList = publication.books.filter(
          (book) => book !== req.params.isbn
        );
        publication.books = newBooksList;
        return;
      }
    });
    database.books.forEach((book) => {
      if (book.ISBN === req.params.isbn) {
        book.publication = 0;
        return;
      }
    });
    return res.json({
      book: database.books,
      publications: database.publications,
      message: "author was deleted!!!!!",
    });
  });

  module.exports = Router;