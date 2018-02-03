import { Post } from '../src/interfaces';
import { default as content, _mtime, _birthtime } from './post_1_content.md';

const post: Post = {
  title: 'Simpler times',
  slug: 'simpler-times',
  created_at: _birthtime,
  updated_at: _mtime,
  content,
};

export default post;
