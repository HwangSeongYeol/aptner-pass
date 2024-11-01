export interface User {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
  user_view_type: string;
  id: number;
  score: number;
  site_admin: false;
}

export interface ProcessedUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}
