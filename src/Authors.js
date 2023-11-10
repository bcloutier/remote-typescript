import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { Posts } from './Posts';
import { GET_POSTS_BY_AUTHOR } from './Queries';
import { Alert } from './Styles';

export const Authors = ({ authors }) => {
  return (
    <div className="read" style={{ fontSize: 20, fontStyle: 'italic' }}>
      by{' '}
      {authors.map(a => (
        <Link key={a.id} to={`/author/${a.id}`} className="read" style={{ marginRight: 5 }}>
          {a.name}
        </Link>
      ))}
    </div>
  );
};

export const Author = () => {
  const { id } = useParams();

  const { data, loading } = useQuery(GET_POSTS_BY_AUTHOR, {
    variables: {
      authorId: id,
    },
  });

  if (loading) return <div>Loading...</div>;

  const { posts } = data;
  const length = posts.length;

  return (
    <div>
      {length > 0 && <h1>{posts[0].authors[0].name}</h1>}
      {length === 0 && (
        <Alert>
          There are no entries by this author, <Link to="/post/create">create one</Link>!
        </Alert>
      )}
      <Posts posts={posts} />
    </div>
  );
};
