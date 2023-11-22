export type USER_TYPE = {
  email: string;
  password: string;
  name: string;
  id: number;
  bio?: string | null;
  profilePhoto?: string | null;
  profession?:
    | {
        emoji: string;
        name: string;
      }
    | any;

  socials?:
    | {
        github: string;
        linkedIn: string;
        twitter: string;
        instagram: string;
        youtube: string;
      }
    | null
    | any;
  token: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Register_Type = {
  email: string;
  password: string;
  name: string;
};
export type Login_Type = {
  email: string;
  password: string;
};
