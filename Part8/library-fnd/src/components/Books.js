import { useQuery } from "@apollo/client"
import { useState } from "react"
import { ALL_BOOKS, FAV_BOOKS } from "../queries"


const Books = (props) => {
  const [filter, setFilter] = useState("all")

  let style = props.show 
  ? { display: 'block' }
  : { display: 'none' }

  const bfetch = useQuery(ALL_BOOKS)

  const gfecth = useQuery(FAV_BOOKS, {
    variables: {genre: filter}
  })

  if (bfetch.loading || gfecth.loading) {
    return null
  }

  //console.log(gfecth.data.allBooks);

  //const forGenres = bfetch.data.allBooks
  const all = bfetch.data.allBooks

  const books = filter === "all" 
    ? all
    : gfecth.data.allBooks
    
  //: all.filter( e => e.genres.map(e => e.toLowerCase()).indexOf(filter.toLowerCase()) !== -1)


  const genres = all.reduce((acc, e) => {
    for (let i = 0; i < e.genres.length ; i++) {
      if (acc.indexOf( e.genres[i].toLowerCase()) === -1) {
        acc.push(e.genres[i].toLowerCase())
      }
    }
    return acc
  }, ["all"])

  return (
    <div style={style}>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => {
            let e = ""
            return (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )})}
        </tbody>
      </table>
      {genres.map(e => <button key={e} onClick={() => setFilter(e)}>{e}</button>)}
    </div>
  )
}

export default Books
