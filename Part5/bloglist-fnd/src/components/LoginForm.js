import React from 'react'

const Form = (props) => {
  return (
    <div>
      {props.text}
      <input
        id={props.id}
        type={props.type}
        value={props.value}
        name={props.name}
        onChange={props.onChange}
      />
    </div>)
}

const LoginForm = (props) => {
  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={props.onSubmit} id="form1" >
        <Form id='username' text="username" type={'text'} value={props.vu} name={'Username'}
          onChange={props.chu}
        />
        <Form id='password' text="password" type={'password'} value={props.vp} name={'Password'}
          onChange={props.chp}
        />
      </form>
      <button id='login-btn' type="submit" form="form1" >login</button>
    </div>
  )
}


export default LoginForm
