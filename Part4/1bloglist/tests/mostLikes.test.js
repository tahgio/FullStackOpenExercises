const listHelper = require('../utils/list_helper')
const init = require('./test_helper')

describe('most_likes', () => {
    test('of an empty array, zero', () => {
        expect(listHelper.mostLikes([])).toBe(0)
    })

    const oneBlog = [init.blogs[0]]

    test('when list has one blog, the blog', () => {
        expect(listHelper.mostLikes(oneBlog)).toEqual({
            author: "Michael Chan",
            likes: 7
          })
    })

    test('list with multiple blogs, the blog with most likes', () => {
        expect(listHelper.mostLikes(init.blogs)).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
          })
    })
})
