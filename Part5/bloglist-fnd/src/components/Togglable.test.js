import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe('togglable test', () => {
    let container

    beforeEach(()=> {
        container = render(
            <Togglable blabel='show' b2label='hide'>
                <div className='tgtestdiv'>
                    some content
                </div>
            </Togglable>
        ).container
    })

    test('renders its children', ()=> {
        screen.findAllByText('some content')
    })
    
    test('at start the children are not displayed', ()=> {
            
        const div = container.querySelector('.tgchildcontent')
        expect(div).toHaveStyle('display: none')
    })

    test('after clicking the button, children are displayed', () => {
        const button = screen.getByText('show')
        userEvent.click(button)
    
        const div = container.querySelector('.tgchildcontent')
        expect(div).not.toHaveStyle('display: none')
      })

})

