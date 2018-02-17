import { PageSources } from '../src/interfaces';
import { createElement } from 'snabbdom-pragma';
import { Container } from '../components/Container';
import { Paragraph } from '../components/Paragraph';
import { Date_ } from '../components/Date';
import typo from '../styles/typography.css';
import posts from '../posts';

export default function List_Posts(sources: PageSources) {
  const hasPosts = posts.length !== 0;
  return {
    DOM: sources.History.map(({ pathname }) => (
      <Container>
        {hasPosts ? (
          <h2 className="">Posts:</h2>
        ) : (
          <div>
            <h2>No posts yet :'(</h2>
            <Paragraph>They are coming though !</Paragraph>
          </div>
        )}
        <ul>
          {posts.map(post => (
            <li className={typo.reading}>
              <a target="" href={`${pathname}/${post.slug}`}>
                {post.title}
              </a>&nbsp;&nbsp;&nbsp;
              <Date_ timestamp={post.created_at} format="simple" />
            </li>
          ))}
        </ul>
      </Container>
    )),
  };
}
