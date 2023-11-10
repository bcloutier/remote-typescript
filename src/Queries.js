import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      authors {
        id
        name
      }
    }
  }
`;

export const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      id
      name
    }
  }
`;

export const GET_POSTS_BY_AUTHOR = gql`
  query GetPostsByAuthor($authorId: ID) {
    posts(where: { authors_some: { id: $authorId } }) {
      id
      title
      authors {
        id
        name
      }
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query GetPost($id: ID) {
    post(where: { id: $id }) {
      id
      title
      content {
        html
      }
      authors {
        id
        name
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($data: PostCreateInput!) {
    createPost(data: $data) {
      id
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($data: PostUpdateInput!, $id: ID!) {
    updatePost(data: $data, where: { id: $id }) {
      id
    }
  }
`;

export const PUBLISH_POST = gql`
  mutation PublishPost($id: ID!) {
    publishPost(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;
