export type UserSummaries = {
  id: string;
  url: string;
  response?: string | null;
  title?: string | null;
  created_at: Date;
};

export type ChatType = {
  id: string;
  url: string;
  response?: string | null;
  user_id: string;
  created_at: Date;
  title: string;
};

export type AddUrlErrorType = {
  url?: string;
  user_id?: string;
};


