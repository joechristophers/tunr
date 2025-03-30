import Image from "next/image"
import { useEffect, useState } from "react"




const BooksPage = ()=>{
    const [page, setPage] = useState(2)
    const [books, setBooks] = useState([])
const Fetch = async ()=>{

    try {
        const response = await fetch(`/api/books/?page=${page}`);
        const data = await response.json()
        setBooks(data.results);

    } catch (error) {
        
    }
}
const nex = ()=>{
    setPage(page + 1)
}

const prev = () => {
  setPage(page-1, 1);
};
useEffect(()=>{
    Fetch()
}, [page])

    return (
      <div>
        <div>
          {books.map((book, index) => (
            <div key={index}>
              <p>{book?.title} </p>
              <div>
                {book?.authors.map((author, index) => (
                  <div key={index}>
                    <p>{author?.name} </p>
                    <div className="flex gap-2">
                      <p>{author?.birth_year} </p> - 
                      <p>{author?.death_year} </p>
                    </div>
                  </div>
                ))}
              </div>
              <Image
                width={100}
                height={100}
                alt="j"
                src={book?.formats?.["image/jpeg"]}
                unoptimized={true}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between pl-4 pr-4">
          <button onClick={prev}>Prev</button>
          <button onClick={nex}>Next</button>
        </div>
      </div>
    );
}
export default BooksPage