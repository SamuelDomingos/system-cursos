export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  password: string;
};

export type UpdateUserDto = {
  email?: string;
  name?: string;
  password?: string;
  avatar?: string;
};