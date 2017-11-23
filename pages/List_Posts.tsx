import { PageSources } from '../src/interfaces';
import { createElement } from 'snabbdom-pragma';
import { Container } from '../components/Container';
import typo from '../styles/typography.css';
import posts from '../posts';

export default function List_Posts(sources: PageSources) {
  const hasPosts = posts.length !== 0;
  return {
    DOM: sources.History.map(location => (
      <Container>
        {hasPosts ? (
          <h2 className="">Posts:</h2>
        ) : (
          <div>
            <h2>No posts yet :'(</h2>
            <p>They are coming though !</p>
          </div>
        )}
        <ul>
          {posts.map(post => (
            <li className={typo.reading}>
              <a href={`${location.pathname}/${post.slug}`}>{post.title}</a>
            </li>
          ))}
        </ul>
      </Container>
    )),
  };
}
