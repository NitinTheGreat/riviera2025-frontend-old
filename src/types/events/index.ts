export type Events = {
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
  searchTerm: string
}

export interface EventsResponse {
  events: Events[]
  total_pages: number
  total_events: number
}



export type slots = {
  end_date: string;
  start_date: string;
  venue: string;
};

export type EventDetail = {
  category: string;
  club: string;
  description: string;
  featured: boolean;
  image: string;
  judgement_criteria: string;
  name: string;
  number_of_participants: string;
  pid: string;
  points: string;
  price_per_ticket: number;
  prizes: string;
  slot_details: slots[];
  rules: string;
  short_description: string;
  is_a_team_event: boolean;
  event_type: string;
  start_date: string;
  end_date: string;
  on_hold: boolean;
  venues: string[];
  team_size: string;
}