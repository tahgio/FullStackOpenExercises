import { useQuery } from "@apollo/client"
import { ALL_AUTHORS } from "../queries"
import EditAuthor from "./EditAuthor"



const Authors = (props) => {

  let style = props.show 
  ? { display: 'block' }
  : { display: 'none' }

  const afetch = useQuery(ALL_AUTHORS)
  
  if (afetch.loading) {
    return <p>loading...</p>
  }

  const authors = afetch.data.allAuthors

  return (
    <div style={style}>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditAuthor authors={authors.map(e => <option key={e.id}>{e.name}</option>)}/>
    </div>
  )
}

export default Authors
