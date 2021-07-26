import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { withUrqlClient } from 'next-urql';
import Layout from '../components/Layout';
import {
  useDeletePostMutation,
  useMeQuery,
  usePostsQuery,
} from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import React, { useState } from 'react';
import Updoot from '../components/Updoot';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data: meData }] = useMeQuery();
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });
  const [, deletePost] = useDeletePostMutation();

  if (!fetching && !data) {
    return <div>query failed!</div>;
  }

  return (
    <Layout>
      {!data && fetching ? (
        <div>Loading...</div>
      ) : (
        <Stack>
          {data!.posts.posts.map((p) =>
            !p ? null : (
              <Flex key={p.id} p={5} shadow='md' borderWidth='1' align='center'>
                <Updoot post={p} />
                <Box flex={1}>
                  <NextLink href={`/post/${p.id}`}>
                    <Link>
                      <Heading fontSize='xl'>{p.title}</Heading>
                    </Link>
                  </NextLink>
                  post by {p.creator.username}
                  <Text>{p.textSnippet}</Text>
                </Box>
                {meData?.me?.id === p.creator.id ? (
                  <Box ml='14'>
                    <NextLink href={`/post/edit/${p.id}`}>
                      <IconButton
                        color='green'
                        borderRadius='6'
                        aria-label='Delete Button'
                        icon={<EditIcon />}
                      />
                    </NextLink>
                    <IconButton
                      color='red'
                      borderRadius='6'
                      aria-label='Delete Button'
                      icon={<DeleteIcon />}
                      onClick={() => {
                        deletePost({ id: p.id });
                      }}
                    />
                  </Box>
                ) : null}
              </Flex>
            )
          )}
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

//!: 10:20
