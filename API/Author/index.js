//Initializing Express Router
const Router = require("express").Router();

//Database Models

const AuthorModel = require("../../database/author");

/*
 Route         /author
 Des           to get all authors
 Access        Public
 Parameters     none
 Method         GET
*/
Router.get("/",async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json({ authors: getAllAuthors });
});

/*
 Route         /author/new
 Des           add new author
 Access        Public
 Parameters     none
 Method         post
*/

Router.post("/new",async (req, res) => {
    try { 
        const { newAuthor} = req.body;
     await AuthorModel.create(newAuthor);

    return res.json({ message: "Author was added"});
    }
    catch (error){
        return res.json({ error: error.message });
    }
   
});

/*
Route               /author
Description        get a list of authors based on books isbn
Access              PUBLIC
Parameters          isbn
Method              get
*/
Router.get("/:isbn", (req, res) => {
 const getSpecificAuthors = database.authors.filter((author)=>
  author.books.includes(req.params.isbn)
);
if (getSpecificAuthors.length === 0) {
    return res.json({
        error: `no author found for the book ${req.params.isbn}`,
    });
}
return res.json({ authors : getSpecificAuthors});
});
/*
Route               /author/delete
Description         delete an author
Access              PUBLIC
Parameters          id
Method              DELETE
*/
Router.delete("/author/delete/:id", (req, res) => {
    const { id } = req.params;

    const filteredAuthors = Database.Author.filter(
        (author) => author.id !== parseInt(id)
    );

    Database.Author = filteredAuthors;

    return res.json(Database.Author);
});

module.exports = Router;