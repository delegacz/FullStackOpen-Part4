let _ = require('lodash')

const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => {
        return sum + blog.likes
    },0)
}

const favoriteBlog = blogs => {
    return blogs.reduce((blogEntry, comparedBlogEntry) => (blogEntry.likes > comparedBlogEntry.likes ? blogEntry : comparedBlogEntry))
}

const mostBlogs = blogs => {
  let list = _.countBy(blogs, "author")
  let author = Object.keys(list).reduce((authorEntry, comparedAuthorEntry) => authorEntry > comparedAuthorEntry ? authorEntry : comparedAuthorEntry)
  let numberOfBlogs = Object.values(list).reduce((blogEntry, comparedBlogEntry) => blogEntry > comparedBlogEntry ? blogEntry : comparedBlogEntry)

  return {
      "author": author,
      "blogs": numberOfBlogs
  }
}
 const mostLikes = blogs => {

    let authorsWithLikes = []
    
    _.forEach(blogs, (entry) => {
        authorsWithLikes.push(
            {
            "author": entry.author,
            "likes": entry.likes
        })  
    })
    let author = authorsWithLikes.reduce((currentAuthor, comparedAuthor) => currentAuthor.likes > comparedAuthor.likes ? currentAuthor : comparedAuthor)
    
    
    return author
 
 }


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}