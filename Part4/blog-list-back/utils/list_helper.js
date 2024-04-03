const _ = require('lodash');
const dummy = (blogs) => {
    // ...
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => sum + item.likes
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (fav, item) => {
        if(item.likes > fav.likes ){
            return {
                title: item.title,
                author: item.author,
                likes: item.likes
            }
        }
        return fav
    }
    return blogs.reduce(reducer, blogs[0])

}

const mostsBlogs = (blogs) => {
    const authors = blogs.map(blog => blog.author)
    const frequencyMap = _.countBy(authors)
    const keyWithHighestValue = _.maxBy(_.keys(frequencyMap), key => frequencyMap[key]);
    return {
        author: keyWithHighestValue,
        blogs: frequencyMap[keyWithHighestValue]
    }
}

const mostLikes = (blogs) => {
    const frequencyMap = _.reduce(blogs, function (result, value) {
        const authors = result.map(obj => obj.author)
        if(_.includes(authors, value.author)){
            const index = _.indexOf(authors, value.author)
            result[index].likes += value.likes
        }else{
            result.push({ author: value.author, likes: value.likes })
        }
        return result
    },[])
    return frequencyMap.reduce(function (res, val) {
        if(val.likes > res.likes){
            return val
        }
        return res
    },frequencyMap[0])
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostsBlogs,
    mostLikes
}