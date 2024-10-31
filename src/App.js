import { useState } from 'react';
import './App.css';


function App() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [book, setBook] = useState([]);
  const [isEditIndex, setIsEditIndex] = useState(null)

  const bookFormSubmitHandler = (event)=> {
    event.preventDefault();
    if(!title || !author || !isbn) {
      alert("pleace enter the values!")
    }
    if(isEditIndex == null) {
    setBook([...book, { title, author, isbn }]);
    }else {
       const tempBook = [...book]
       const findBook = tempBook[isEditIndex]
      //  console.log(findBook)
      findBook.title = title;
      findBook.author = author;
      findBook.isbn = isbn;
    }
    setTitle("")
    setAuthor("")
    setIsbn("")
  }
  const deleteSubmiHandler = (event,index) => {
    event.preventDefault();
    if(window.confirm("Are you sure!")) {
      const tempBook = [...book]
      // console.log(tempBook)
      tempBook.splice(index,1)
      setBook(tempBook)
    }
  } 
  const editSubmitHandler = (event, index) => {
    event.preventDefault();
    setIsEditIndex(index)
    // console.log(index)
    const findIndex = book[index]
    setTitle(findIndex.title)
    setAuthor(findIndex.author)
    setIsbn(findIndex.isbn)

  }

  return (
    <div className="container">
    <h1>Add Book</h1>
    <form id="book-form" onSubmit={bookFormSubmitHandler} >
      <div>
        <label>Title</label>
        <input
          type="text"
          id="title"
          className="u-full-width"
          value= {title}
          onChange={(event) =>setTitle(event.target.value)}
          
        />
      </div>
      <div>
        <label>Author</label>
        <input
          type="text"
          id="author"
          className="u-full-width"
          value= {author}
          onChange={(event) =>setAuthor(event.target.value)}
        />
      </div>
      <div>
        <label>ISBN#</label>
        <input
          type="number"
          id="isbn"
          className="u-full-width"
          value= {isbn}
          onChange={(event) => setIsbn(event.target.value)}
        />
      </div>
      <div>
        <input type="submit" 
        value= {isEditIndex !== null ? "update" : "create" }
        className="u-full-width" />
      </div>
    </form>
    <table className="u-full-width">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>ISBN</th>
          <th></th>
        </tr>
      </thead>
      <tbody id="book-list">
        {book.map((singleBook, index) => {
          return (
            <tr key={index}>
            <td>{singleBook.title}</td>
            <td>{singleBook.author}</td>
            <td>{singleBook.isbn}</td>
            <td>
              <button onClick={(event) => editSubmitHandler(event, index)}>Edit</button>
            </td>
            <td>
              <a
                href="#"
                className="delete"
                onClick={(event) => deleteSubmiHandler(event, index)}
              >
                X
              </a>
            </td>
          </tr>
          )

        })}
           
          
      </tbody>
    </table>
  </div>
  );
}

export default App;
