import { Post } from 'interfaces';
import { default as content, _updated_at, _created_at } from './post_1_content.md';

const post: Post = {
	title: 'Simpler times',
	slug: 'simpler-times',
	created_at: _created_at,
	updated_at: _updated_at,
	content,
};

export default post;
