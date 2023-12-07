import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "./Queries";
import { Alert } from "./Styles";
import { Posts } from "./Posts";

export interface Author {
  id: string;
  name: string;
}

export interface Post {
  id: string;
  title: string;
  authors?: Author;
  content?: {
    html: string;
  };
}

export interface PostsData {
  posts: Post[];
}

const Home = () => {
  const { data, loading, error } = useQuery<PostsData>(GET_POSTS);

  if (loading || !data) return <div>Loading...</div>;

  if (error) return <div>Failed</div>;

  const { posts } = data;
  const { length } = posts;

  return (
    <div>
      <h1>
        Welcome <Link to="/post/create">+</Link>
      </h1>
      {length === 0 && (
        <Alert>
          There are no entries in this blog,{" "}
          <Link to="/post/create">create one</Link>!
        </Alert>
      )}
      <Posts posts={posts} />
    </div>
  );
};

export default Home;
