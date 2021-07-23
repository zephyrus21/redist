import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Flex, IconButton } from '@chakra-ui/react';
import React from 'react';
import { PostsQuery, useVoteMutation } from '../generated/graphql';

interface UpdootProps {
  post: PostsQuery['posts']['posts'][0];
}

const Updoot: React.FC<UpdootProps> = ({ post }) => {
  const [, vote] = useVoteMutation();

  return (
    <Flex direction='column' align='center' pr={4}>
      <IconButton
        colorScheme='green'
        aria-label='Up Vote'
        icon={<ChevronUpIcon />}
        onClick={() => {
          vote({
            postId: post.id,
            value: 1,
          });
        }}
      />
      {post.points}
      <IconButton
        colorScheme='red'
        aria-label='Down Vote'
        icon={<ChevronDownIcon />}
        onClick={() => {
          vote({
            postId: post.id,
            value: -1,
          });
        }}
      />
    </Flex>
  );
};

export default Updoot;
