import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';

interface InputFieldProps {
  label: string;
  placeholder: string;
  name: string;
  type?: string;
  textarea?: string;
}

const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      {props.textarea === 'true' ? (
        <Textarea
          {...field}
          {...props}
          id={field.name}
          placeholder={props.placeholder}
        />
      ) : (
        <Input
          {...field}
          {...props}
          id={field.name}
          placeholder={props.placeholder}
        />
      )}
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;
