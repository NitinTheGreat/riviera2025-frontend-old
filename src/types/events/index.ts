export interface Events {
  category: string;
  club: string;
  description: string;
  end_date: string;
  featured: boolean;
  image: string;
  name: string;
  on_hold: boolean;
  pid: string;
  price_per_ticket: number;
  start_date: string;
  team_size: string;
  total_prize: string;
  venues: string[];
}

export interface EventsResponse {
  events: Events[];
  total_pages: number;
}
