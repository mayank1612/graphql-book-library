import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [selectedBook, setselectedBook] = useState();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <div>
      <ul id="book-list">
        {data.books.map((book, index) => {
          return (
            <li
              key={book.id}
              value={book.id}
              onClick={() => {
                setselectedBook(book.id);
              }}
            >
              {book?.name}
            </li>
          );
        })}
      </ul>
      <BookDetails bookId={selectedBook} />
    </div>
  );
}

export default BookList;
