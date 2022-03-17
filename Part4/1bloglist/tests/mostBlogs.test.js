const listHelper = require('../utils/list_helper')
const init = require('./test_helper')

describe('most_blogs', ()=> {
    test('of an empty array, zero', ()=> {
        expect(listHelper.mostBlogs([])).toBe(0)
    })

    const oneBlog = [init.blogs[0]]

    test('when list has one blog, the blog', () => {
        expect(listHelper.mostBlogs(oneBlog)).toEqual({
            author: "Michael Chan",
            blogs: 1
          })
    })

    test('list with multiple blogs, the author with most blogs', () => {
        expect(listHelper.mostBlogs(init.blogs)).toEqual({
            author: "Robert C. Martin",
            blogs: 3
          })
    })
})

  