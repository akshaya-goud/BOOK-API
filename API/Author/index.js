//Initializing Express Router
const Router = require("express").Router();

//Database Models

const AuthorModel = require("../../database/author");

/*
Route             /author
Description    get all authors
Access          Public
Parameters      none
Method          GET
*/
Router.get("/", async (req, res) => {
    const getAllAuthors = await AuthorModel.findOne();
    return res.json({ authors: getAllAuthors });
  });


  /*
Route             /author
Description    get a list of authors based on name
Access          Public
Parameters      name
Method          GET
*/
Router.get("/:name", async (req, res) => {
    const getSpecificAuthors = await AuthorModel.findOne({
      name: req.params.name,
    });
  
    if (!getSpecificAuthors) {
      return res.json({
        error: `No book found for the author of ${req.params.name}`,
      });
    }
    return res.json({ authors: getSpecificAuthors });
  });


  /*
Route             /author/new
Description    Add new author
Access          Public
Parameters      none
Method          post
*/
Router.post("/new", async (req, res) => {
    const { newAuthor } = req.body;
    const addNewAuthor = AuthorModel.create(newAuthor);
    return res.json({ Authors: addNewAuthor, message: "author was added!" });
  });

  module.exports = Router;