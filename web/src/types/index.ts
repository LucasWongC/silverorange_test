/* eslint-disable @typescript-eslint/naming-convention */
export interface IRepo {
  language: string;
  id: number;
  commits_url: string;
  full_name: string;
}

export interface ICommit {
  commit: {
    author: {
      date: Date,
      name: string,
    },
    message: string,
  };
}
