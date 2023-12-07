import styled from "styled-components";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { Authors } from "./Authors";
import RichText from "./RichText";
import {
  CREATE_POST,
  GET_AUTHORS,
  GET_POSTS,
  GET_POST_BY_ID,
  PUBLISH_POST,
  UPDATE_POST,
} from "./Queries";
import { useState } from "react";
import { Button, Input } from "./Styles";
import htmlToAST from "./htmlToAST";
import { Post } from "./Home";

const PostWrapper = styled.div`
  border-bottom: 1px solid #eee;
  padding: 20px 0px;
  font-size: 25px;
`;

export const Posts = ({ posts }: { posts: Post[] }) => {
  return (
    <>
      {posts.map((p) => (
        <PostWrapper key={p.id}>
          <div>
            <Link to={`/post/view/${p.id}`}>
              <b>{p.title}</b>
            </Link>
          </div>
          <Authors authors={p.authors} />
        </PostWrapper>
      ))}
    </>
  );
};

export const Edit = () => {
  const { id } = useParams();

  const { data, loading } = useQuery(GET_POST_BY_ID, {
    variables: {
      id,
    },
  });

  if (loading) return <div>Loading...</div>;

  return <Create post={data.post} />;
};

interface CreateProps {
  post?: any;
}

interface CreatePost {
  title: string;
  content: { children: string };
  authors: { connect: { id: string }[] };
}

export const Create = ({ post }: CreateProps) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content?.html ?? "");
  const [authorId, setAuthorId] = useState(post ? post.authors[0]?.id : "");

  const { data: authorData } = useQuery(GET_AUTHORS);

  const [createPost, { loading: creating }] = useMutation<
    { data: { createPost: { id: string } } },
    { data: CreatePost }
  >(CREATE_POST);
  const [updatePost, { loading: updating }] = useMutation(UPDATE_POST);

  const [publishPost] = useMutation(PUBLISH_POST, {
    awaitRefetchQueries: true,
  });

  const loading = creating || updating;

  const canSubmit = title?.length > 0 && !loading;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label>Choose authors:</label>
      <select
        value={authorId}
        onChange={(e) => {
          setAuthorId(e.target.value);
        }}
      >
        {(authorData?.authors || []).map(
          // @ts-ignore
          (a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          )
        )}
      </select>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Post..."
      />
      <div>
        <RichText onChange={setContent} value={content} />
      </div>
      <Button
        disabled={!canSubmit}
        onClick={async () => {
          const data = {
            title,
            content: {
              children: htmlToAST(content),
            },
            authors: {
              connect: [
                {
                  id: `${authorId}` || `${authorData.authors[0].id}`,
                },
              ],
            },
          };

          let id = post?.id;

          // Creating a new one
          if (!post) {
            const res = await createPost({
              variables: {
                data,
              },
            });

            // @ts-ignore
            id = res?.data?.createPost.id;
          } else {
            await updatePost({
              variables: {
                id,
                data,
              },
            });
          }

          await publishPost({
            variables: {
              id,
            },
            refetchQueries: [
              {
                query: GET_POSTS,
              },
              {
                query: GET_POST_BY_ID,
                variables: {
                  id,
                },
              },
            ],
          });

          navigate(`/`);
        }}
      >
        Submit
      </Button>
    </div>
  );
};
