const Single = ({single}) => {
  //const id = useParams().id
  return (
    <div>
      <h2>{single.content} by {single.author}</h2>
      <p>has {single.votes} votes</p>
    </div>
  )
}

export default Single