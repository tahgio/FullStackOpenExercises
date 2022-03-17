const dummy = (blogArr) => {
    return 1
}

const totalLikes = (arr) => {
    if (arr.length === 0) {
    return 0 }

    let likes = arr.map(e => e.likes)
    let rfunc = (acc, item) => { return acc + item }
    return  likes.reduce(rfunc, 0)
    
}

const favBlog = (arr) => {
    if (arr.length === 0) {
        return 0
    }

    let fav = arr.sort((a,b) => b.likes - a.likes)[0]
    return {
        title: fav.title,
        author: fav.author,
        likes: fav.likes
    }

}

const mostBlogs = (arr) => {
    if (arr.length === 0) {
        return 0
    }

    let blogcount = arr.reduce((acc, e,) => {
        if (acc.length == 0) {return acc.concat([{author: e.author, blogs: 1}])}
        else if (acc.find((it)=> it.author === e.author)) 
         {acc.concat(acc.find((it)=> it.author === e.author).blogs+=1);
         return acc
         }
        else { return [...acc, {author: e.author, blogs: 1}]}
      }, [])
      return blogcount.sort((a,b) => b.blogs - a.blogs)[0]
}

const mostLikes = (arr) => {
    if (arr.length === 0) {
        return 0
    }
    let blogcount = arr.reduce((acc, e,) => {
        if (acc.length == 0) {return acc.concat([{author: e.author, likes: e.likes}])}
        else if (acc.find((it)=> it.author === e.author)) 
         {acc.concat(acc.find((it)=> it.author === e.author).likes+=e.likes);
         return acc
         }
        else { return [...acc, {author: e.author, likes: e.likes}]}
      }, [])
      return blogcount.sort((a,b) => b.likes - a.likes)[0]
}


module.exports = {
    dummy,
    totalLikes,
    favBlog,
    mostBlogs,
    mostLikes
}