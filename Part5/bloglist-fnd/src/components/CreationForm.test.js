import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreationForm from './CreationForm'

test('CreationForm calls the event handler with right details', () => {
    const createB = jest.fn()

    render(<CreationForm createB={createB} />)

    const input = screen.getAllByRole('textbox')
    const saveButton = screen.getByText('save')

    userEvent.type(input[0], 'testing...')
    userEvent.type(input[1], 'Tester')
    userEvent.type(input[2], 'testing.org')
    userEvent.click(saveButton)

    expect(createB.mock.calls).toHaveLength(1)
    expect(createB.mock.calls[0][0].title).toBe('testing...')
    expect(createB.mock.calls[0][0].author).toBe('Tester')
    expect(createB.mock.calls[0][0].url).toBe('testing.org')

})