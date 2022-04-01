import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { initCmts, createCmt } from "../reducers/CmntReducer"


const SingleBlog = ({like, className, style}) => {
  const [value, setValue] = useState('')

  let id = useParams().id
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initCmts(id))
  }, [dispatch])

  const addCmt = (event) => {
    event.preventDefault()
    dispatch(createCmt(id, value))
    setValue('')
  }

  let blogs = useSelector(st => st.blogs)
  let cmts = useSelector(st => st.comments)

 

  let single = blogs.find((e) => e.id === id)
  if (!single) {
    return null
  }
  const addedBy = single.user && single.user.name ? single.user.name : 'anonymous'
  
  return (
    <div className={className} style={style}>
    <h2>{single.title}</h2>
    <a href={single.url}>{single.url}</a>
    <p>{single.likes} likes <button onClick={() => like(single.id)}>like</button></p>
    <p>added by {addedBy}</p>
    <h3>Comments</h3>
    <form id="form1" onSubmit={addCmt}>
      <input type="text" value={value} onChange={(event) => setValue(event.target.value)} />
      <button form="form1" type="submit">
        add comment
      </button>
    </form>
    <ul>
      {cmts.map(e => <li key={e.id}>{e.comment}</li>)}
    </ul>
    </div>
  )

}

export default SingleBlog