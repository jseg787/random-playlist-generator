import React from 'react';
import Post from '../components/Post';
import Loading from '../components/Loading';


class PostsListPage extends React.Component {
  state = {
    posts: [],
    loading: true,
  }

  async componentDidMount() {
    // fetch("/api/posts")
    //   .then(res => res.json())
    //   .then(posts => {
    //     this.setState({
    //       loading: false,
    //       posts: posts.map((p,ii) => <Post {...p} key={ii} />),
    //     });
    //   })
    //   .catch(err => console.log("API ERROR: ", err));
    try {
      const postData = await fetch("/api/posts");
      const postParsed = await postData.json();
      this.setState({
        loading: false,
        posts: postParsed.map((p,ii) => <Post {...p} key={ii} />),
      })
    } catch (err) {
      console.err(err);
    }
  }

  render() {
    if(this.state.loading) {
      return <Loading />;
    }

    return (
      <div className="container-fluid text-center">
        <div className="row justify-content-center">
          { this.state.posts }
        </div>
      </div>
    );
  }
}

export default PostsListPage;