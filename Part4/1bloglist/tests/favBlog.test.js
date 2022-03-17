const listHelper = require('../utils/list_helper')
const init = require('./test_helper')

describe('fav_blog', () => {
    test('of an empty array, zero', () => {
        expect(listHelper.favBlog([])).toBe(0)
    })

    const oneBlog = [init.blogs[0]]

    test('when list has one blog, the blog', () => {
        expect(listHelper.favBlog(oneBlog)).toEqual({
            title: "React patterns",
            author: "Michael Chan",
            likes: 7
          })
    })

    test('list with multiple blogs, the blog with most likes', () => {
        expect(listHelper.favBlog(init.blogs)).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
          })
    })
})
