import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

function AddBook() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBookMutationFunction] = useMutation(addBookMutation);

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleGenre = (e) => {
    setGenre(e.target.value);
  };
  const handleAuthor = (e) => {
    setAuthorId(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    addBookMutationFunction({
      variables: {
        name: name,
        genre: genre,
        authorId: authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
    setAuthorId("");
    setGenre("");
    setName("");
  };
  if (loading) return null;
  if (error) return <p>Error :(</p>;
  return (
    <form id="add-book">
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={handleName} value={name} required />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={handleGenre} value={genre} required />
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={handleAuthor} value={authorId}>
          <option value="" disabled selected>
            Select Author Name
          </option>
          {data.authors.map((author) => {
            return (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            );
          })}
        </select>
      </div>
      <button onClick={submitHandler}>+</button>
    </form>
  );
}

export default AddBook;
