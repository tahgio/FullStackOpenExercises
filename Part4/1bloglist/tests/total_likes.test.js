const listHelper = require('../utils/list_helper')
const init = require('./test_helper')

describe('total_likes', () => {
    test('of an empty array, zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    const oneBlog = [init.blogs[0]]

    test('when list has one blog, the likes of that', () => {
        expect(listHelper.totalLikes(oneBlog)).toBe(7)
    })

    test('list with multiple blogs, the sum of likes', () => {
        expect(listHelper.totalLikes(init.blogs)).toBe(36)
    })
})
