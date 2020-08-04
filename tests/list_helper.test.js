const listHelper = require('../utils/list_helper')
const { TestResult } = require('@jest/types')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})