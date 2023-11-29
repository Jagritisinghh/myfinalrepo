const axios = require('axios');

async function fetchUserData() {
  try {
    const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
    // console.log(usersResponse)

    const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
    // console.log(postsResponse)

    const postsByUser = postsResponse.data.reduce((acc, post) => {
      acc[post.userId] = acc[post.userId] || [];
      acc[post.userId].push({ postId: post.id, title: post.title });
      return acc;
    }, {});

    //  console.log(postsByUser)
    const usersWithPosts = usersResponse.data.map(user => ({
      id: user.id,
      name: user.name,
      posts: postsByUser[user.id] || []
    }));

    return usersWithPosts;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
}

// Example usage
fetchUserData()
  .then(users => {
    console.log('Users with Posts:', users);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
