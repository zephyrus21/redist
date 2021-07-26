import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { useDeletePostMutation, useMeQuery } from '../generated/graphql';

interface EditDeletePostProps {
  id: number;
  creatorId: number;
}

const EditDeletePost: React.FC<EditDeletePostProps> = ({ id, creatorId }) => {
  const [{ data: meData }] = useMeQuery();
  const [, deletePost] = useDeletePostMutation();
  if (meData?.me?.id === creatorId) {
    return (
      <Box>
        <NextLink href={`/post/edit/${id}`}>
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
            deletePost({ id: id });
          }}
        />
      </Box>
    );
  } else {
    return null;
  }
};

export default EditDeletePost;
