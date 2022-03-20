import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const user = {
    username: 'montevideu',
    name: 'Monte Videu',
    user: {
        id: '6232332a1136ce14ebfd6220'
    }
}

const blog = {
    title: 'Test Blog',
    author: 'Tester',
    url: 'testing.org',
    user: {
        username: "montevideu",
        name: "Monte Videu",
        id: "6232332a1136ce14ebfd6220"
    },
    id: "62325df56b7a3e297f4a3da5b"
}

test('renders content', () => {
   
//    const { container } = render(<Blog blog={blog} user={user}/>)
//    const div = container.querySelector('.titnaut')
//    expect(div).toHaveTextContent('Test Blog') 
//    expect(div).toHaveTextContent('Tester')   
   
render(<Blog blog={blog} user={user}/>)
const title = screen.getByText('Test Blog')
const author = screen.getByText('Tester')

expect(title).toBeDefined()
expect(author).toBeDefined()


})

test('clicking the like button twice calls event handler twice', async () => {
      
    const mockHandler = jest.fn()
  
    render(
      <Blog blog={blog} user={user} lH={mockHandler} />
    )
  
    const button = screen.getByText('like')
    userEvent.click(button)
    userEvent.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(2)
  })



