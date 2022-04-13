import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { FAV_BOOKS, ME } from "../queries"


const Recommend = ({show}) => {
  const [genre, setGenre] = useState(null)
  //const [books, setBooks] = useState(null)

  let style = {
    display: show ? 'initial' : 'none'
  }
  
  const me = useQuery(ME)
  const favBooks = useQuery(FAV_BOOKS, {
     variables: { genre },
     skip: !genre
   })

  const fav = me.loading || !me.data.me
  ? null
  : me.data.me.favoriteGenre

  useEffect (
    () => 
    setGenre(fav),
    [!me.loading]
  )  

  if (!favBooks.data) {
    return <></>
  }

  const books = favBooks.data.allBooks
  
  return (
    <div style={style} >
      <h2>Recommendations</h2>
      <p>books in your favorite genre <strong>{genre}</strong> </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    
    </div>
  )

}

export default Recommend