export default async function GetBooks(req, res) {
  try {
    const { library = "gutendex", page = 1 } = req.query;
    let books = null;

    if (library === "gutendex") {
      const response = await fetch(
        `https://gutendex.com/books/?page=${page}`
      );
      books = await response.json();
    } else if (library === "openlibrary") {
      const response = await fetch("https://openlibrary.org/ebooks.json");
      books = await response.json();
    } else {
      return res.status(400).json({ message: "Invalid library option" });
    }

    return res.status(200).json(books);
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
