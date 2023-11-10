/**
 * Apollo Docs: apollographql.com/docs/react/
 * QuillJS: https://quilljs.com/
 * React QuillJS: https://github.com/zenoamaro/react-quill
 * React Router: https://reactrouter.com/
 * GraphCMS: https://graphcms.com
 */

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import 'quill/dist/quill.snow.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Config from './Config';
import { Content, GlobalStyle, Nav } from './Styles';
import Home from './Home';
import { Author } from './Authors';
import { Create, Edit, Post } from './Posts';

const Blog = () => {
  return (
    <Router>
      <GlobalStyle />
      <Nav>
        <ul>
          <li>
            <Link to="/">
              <b>Blog</b>
            </Link>
          </li>
        </ul>
      </Nav>
      <Content>
        <Routes>
          <Route path="/post/create" element={<Create />} />
          <Route path="/post/edit/:id" element={<Edit />} />
          <Route path="/post/view/:id" element={<Post />} />
          <Route path="/author/:id" element={<Author />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Content>
    </Router>
  );
};

const Wrapper = () => {
  const apolloClient = new ApolloClient({
    uri: Config.GRAPHCMS,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={apolloClient}>
      <Blog />
    </ApolloProvider>
  );
};

export default Wrapper;
