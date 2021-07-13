import { UsernamePasswordInput } from '../resolvers/UsernamePasswordInput';

export const validateRegister = (options: UsernamePasswordInput) => {
  if (!options.email.includes('@')) {
    return [
      {
        field: 'email',
        message: 'invalid email',
      },
    ];
  }

  if (options.username.length <= 2) {
    return [
      {
        field: 'username',
        message: 'username must have more than 2 characters',
      },
    ];
  }

  if (options.username.includes('@')) {
    return [
      {
        field: 'username',
        message: 'cannot have a @ sign',
      },
    ];
  }

  if (options.password.length <= 4) {
    return [
      {
        field: 'password',
        message: 'password must have more than 4 characters',
      },
    ];
  }

  return null;
};
