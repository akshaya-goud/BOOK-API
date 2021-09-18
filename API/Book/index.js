
//Initializing Express router
const Router = require("express").Router();

//Database Models

const BookModel = require("../../database/book");

/*
Route             /
Description     get all books
Access          Public
Parameters      none
Method          GET
*/
Router.get("/", async (req, res) => {
    const getAllBooks = await BookModel.find();
    console.log(getAllBooks);
    return res.json(getAllBooks);
  });


  /*
Route             /is
Description    get specific book based on ISBN
Access          Public
Parameters      isbn
Method          GET
*/
Router.get("/is/:isbn", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });
    if (!getSpecificBook) {
      return res.json({
        error: `No book found for the ISBN of ${req.params.isbn}`,
      });
    }
    return res.json({ book: getSpecificBook });
  });

/*
Route             /c
Description    get specific book based on category
Access          Public
Parameters      category
Method          GET
*/
Router.get("/c/:category", async (req, res) => {
    const getSpecificBooks = await BookModel.findOne({
      category: req.params.category,
    });
  
    if (!getSpecificBooks) {
      return res.json({
        error: `No book found for the category of ${req.params.category}`,
      });
    }
    return res.json({ book: getSpecificBooks });
  });


 /*
Route             /book/new
Description   Add new books
Access          Public
Parameters      none
Method          post
*/
Router.post("/new", async (req, res) => {
    try {
         const { newBook } = req.body;
  
         await BookModel.create(newBook);
  
    return res.json({ message: "book was added!" });
} catch (error) {
    return res.json({ error: error.message });
}
   
  });
  
/*
Route             /book/update
Description    update title of a book
Access          Public
Parameters      isbn
Method          put
*/
Router.put("/update/:isbn", async (req, res) => {
    const updatedBook = await BookModel.findOneAndUpdate(
      {
        ISBN: req.params.isbn,
      },
      {
        $addToSet: { title: req.body.bookTitle },
      },
      {
        new: true,
      }
    );
  
    return res.json({
      books: updatedBook,
    });
  });

  /*
Route             /book/author/update
Description    update/add new author
Access          Public
Parameters      isbn
Method          put
*/
Router.put("/author/update/:isbn", async (req, res) => {
    const updatedBook = await BookModel.findOneAndUpdate(
      {
        ISBN: req.params.isbn,
      },
      {
        $addToSet: {
          authors: req.body.newAuthor,
        },
      },
      { new: true }
    );
  
    const updatedAuthor = await AuthorModel.findOneAndUpdate({
        id : req.body.newAuthor,
    },
    {
       $addToSet:{
           books: req.params.isbn,
       } ,
    });
  
    return res.json({
      books: updatedBook,
      authors: updatedAuthor,
      message: "New Author was added",
    });
  });


  /*
Route             /book/delete
Description    delete a book
Access          Public
Parameters      isbn
Method          delete
*/
Router.delete("/delete/:isbn", async (req, res) => {
    const updateBookDatabase = await BookModel.findOneAndDelete(
     {
         ISBN : req.params.isbn,
     }
    );
    
    return res.json({ books:updateBookDatabase });
  });


  /*
Route             /book/delete/author
Description    delete a author from a book
Access          Public
Parameters      isbn,author id
Method          delete
*/
Router.delete("/delete/author/:isbn/:authorId",async (req, res) => {
    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN : req.params.isbn,
    },
    {
        $pull:{
            authors: parseInt(req.params.authorId),
        },
    },
    {new: true}
    );
   
    const updatedAuthor = await AuthorModel.findOneAndUpdate({
      id : parseInt(req.params.authorId),
  },
  {
      $pull:{
          books: req.params.isbn,
      },
  },
  {new: true}
   );
    return res.json({
      book: updatedBook,
      author: updatedAuthor,
      message: "author was deleted!!!!!",
    });
  });

  module.exports = Router;