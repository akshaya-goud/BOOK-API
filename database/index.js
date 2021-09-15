let books = [
    {
    ISBN: "12345ONE",
    title: "Getting started with MERN",
    authors: [1, 2, 3],
    languages: "en", 
    pubDate: "2021 -07-07",
    numOfPage: 225,
    category: ["Fiction", "Programming", "tech", "web dev"],
    publication: 1,
    },
    {
        ISBN: "12345Two",
        title: "Getting started with Python",
        authors: [1, 2],
        languages: "en", 
        pubDate: "2021 -07-07",
        numOfPage: 225,
        category: ["Fiction", "tech", "web dev"],
        publication: 1,
    },
];

const authors = [
    {
        id: 1,
        name: "pavan",
        books: ["12345ONE"],
    },
    {
        id: 2,
        name: "akshaya",
        books: ["12345ONE"],
    },
];

const publications = [
    {
        id: 1,
        name: "Chakra",
        books: ["12345ONE"],
    },
    {
        id: 2,
        name: "Vickie Publications",
        books: ["12345Two"],
    },
];

module.exports = { books, authors, publications };