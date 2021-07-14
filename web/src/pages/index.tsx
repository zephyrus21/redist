import { Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { withUrqlClient } from 'next-urql';
import Layout from '../components/Layout';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Index = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 10,
      cursor: '',
    },
  });

  return (
    <Layout>
      <NextLink href='/create-post'>
        <Link>Create Post</Link>
      </NextLink>
      {!data ? null : data.posts.map((p) => <div key={p.id}>{p.title}</div>)}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
