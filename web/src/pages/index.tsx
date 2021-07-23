import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { withUrqlClient } from 'next-urql';
import Layout from '../components/Layout';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
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
          {data!.posts.posts.map((p) => (
            <Flex key={p.id} p={5} shadow='md' borderWidth='1'>
              <Flex direction='column' align='center' pr={4}>
                <IconButton aria-label='Up Vote' icon={<ChevronUpIcon />} />
                {p.points}
                <IconButton aria-label='Down Vote' icon={<ChevronDownIcon />} />
              </Flex>
              <Box>
                <Heading fontSize='xl'>{p.title}</Heading>
                post by {p.creator.username}
                <Text>{p.textSnippet}</Text>
              </Box>
            </Flex>
          ))}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            colorScheme='teal'
            isLoading={fetching}
            m='auto'
            my='8'>
            Load More
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
