function postViewModel(post) {
    return {
        _id: post.id,
        title: post.title,
        keyword: post.keyword,
        location: post.location,
        date: post.date,
        image: post.image,
        description: post.description,
        author: authorViewModel(post.author),
        votes: post.votes,
        rating: post.rating,
    };
}

function authorViewModel(user) {
    return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName
    };
}

module.exports = {
    postViewModel,
}