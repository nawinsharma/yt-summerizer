export type UserSummaries = {
  id: string;
  url: string;
  response?: string | null;
  title?: string | null;
  author?: string | null;
  view_count?: number | null;
  created_at: Date;
};

export type ChatType = {
  id: string;
  url: string;
  response?: string | null;
  title?: string | null;
  author?: string | null;
  view_count?: number | null;
  user_id: string;
  created_at: Date;
};

export type AddUrlErrorType = {
  url?: string;
  user_id?: string;
};


