import { useParams } from "react-router-dom"


const SingleUser = ({blogs, className}) => {
  const id = useParams().id
  let userblogs = blogs.filter(e => e.user.id === id)
  //console.log(userblogs, id);
  return (
    <div className={className}>
      <h2>added blogs</h2>
      <ul>
      {userblogs.map(e => <li key={e.id}>{e.title}</li>)}
      </ul>
    </div>
  )
}

export default SingleUser