export interface ICreateAccount {
  username: string;
  email: string;
  roles: string[];
  bio?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface Iuser {
  email: string | null;
  username: string | null;
  bio: string | null;
  image: string | null;
  role: string | null;
  roles?: string[]|null;
  //token?: string | null;
}

export interface IuserRes {
  data: {
    email: string | null;
    username: string | null;
    bio: string | null;
    image: string | null;
    role: string | null;
    token: string | null;
  };
}

export interface Icredentials {
  email: string;
  password: string;
  role: string;
}
