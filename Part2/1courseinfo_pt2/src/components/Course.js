import React from 'react'

const CoursePara = (props) => {
    return (<p>{props.nm} {props.ex}</p>)
  }
  
  const CourseTotal = (props) => {
    return (<p><strong>total of {props.tot.reduce((acc, e) => acc + e.exercises, 0
      )} exercises</strong></p>)
  }
  
  const EachCourse = (props) => {
    return (<div>
      <h2>{props.t.name}</h2>
      {props.t.parts.map(e => 
      <CoursePara key={e.id} nm={e.name} ex={e.exercises} />
      )}
      <CourseTotal tot={props.t.parts} /> 
    </div>)
  }
  
  const Course = (props) => {
     
    return (
      <div>
      <h1>{props.title}</h1>
      {props.co.map(e => <EachCourse key={e.id} t={e}/> )}
      </div>)}

export default Course