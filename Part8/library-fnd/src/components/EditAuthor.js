import { useMutation } from "@apollo/client"
import { useState } from "react"
import { EDIT_AUTHOR } from "../queries"


const EditAuthor = ({authors}) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [ editAuthor ] = useMutation(EDIT_AUTHOR)

  const submit = (event) => {
    event.preventDefault() 

    editAuthor({variables: { name, setBornTo: Number(born)}})

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form id="birthform" onSubmit={submit}>
        <div>
          name: 
        <select onChange={(event) => setName(event.target.value)}>
          {authors}
        </select>
        </div>
        <div>
          year:
        <input
          value={born}
          onChange={(event) => setBorn(event.target.value)}
        />
        </div>
      </form>
      <button type="submit" form="birthform">save</button>
    </div>
  )
}

export default EditAuthor