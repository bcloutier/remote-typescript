import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Authors } from "./Authors";
import { GET_POST_BY_ID } from "./Queries";

import { Post as PostI } from "./Home";

interface PostData {
  post?: PostI;
}

interface PostVariables {
  id?: string;
}

export const Post = () => {
  const { id } = useParams();

  const { data, loading } = useQuery<PostData, PostVariables>(GET_POST_BY_ID, {
    variables: {
      id,
    },
  });

  if (loading || !data) return <div>Loading...</div>;

  const { post } = data;

  if (!post) return <div>Post Not Found with ID: {id}</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <Authors authors={post.authors} />
      {post.content && (
        <div dangerouslySetInnerHTML={{ __html: post.content.html }} />
      )}
      <Link to={`/post/edit/${id}`}>Edit</Link>
    </div>
  );
};
