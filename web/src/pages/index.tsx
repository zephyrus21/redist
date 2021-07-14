import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { withUrqlClient } from 'next-urql';
import Layout from '../components/Layout';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Index = () => {
  const [{ data, fetching }] = usePostsQuery({
    variables: {
      limit: 10,
      cursor: '',
    },
  });

  if (!fetching && !data) {
    return <div>query failed!</div>;
  }

  return (
    <Layout>
      <Flex align='center'>
        <Heading>Redist</Heading>
        <NextLink href='/create-post'>
          <Link ml='auto'>Create Post</Link>
        </NextLink>
      </Flex>
      <br />
      {!data && fetching ? (
        <div>Loading...</div>
      ) : (
        <Stack>
          {data!.posts.map((p) => (
            <Box key={p.id} p={5} shadow='md' borderWidth='1'>
              <Heading fontSize='xl'>{p.title}</Heading>
              <Text>{p.textSnippet}</Text>
            </Box>
          ))}
        </Stack>
      )}
      {data ? (
        <Flex>
          <Button colorScheme='teal' isLoading={fetching} m='auto' my='8'>
            Load More
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
