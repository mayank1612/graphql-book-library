import React from "react";
import { useQuery, NetworkStatus } from "@apollo/client";

import { getBookQuery } from "../queries/queries";

function BookDetails({ bookId }) {
  const { loading, error, data, networkStatus } = useQuery(getBookQuery, {
    variables: { id: bookId },
    notifyOnNetworkStatusChange: true,
  });
  if (networkStatus === NetworkStatus.refetch) return "Refetching!";
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  const { book } = data;
  if (book) {
    return (
      <div id="book-details">
        <h2>Book Name: {book.name}</h2>
        <p>Genre: {book.genre}</p>
        <p>Author Name: {book.author.name}</p>
        <p>All books by this author:</p>
        <ul className="other-books">
          {book.author.books.map((item) => {
            return <li key={item.id}>{item.name}</li>;
          })}
        </ul>
      </div>
    );
  } else {
    return <div id="book-details">No book selected...</div>;
  }
}

export default BookDetails;
