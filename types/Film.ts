export interface Film {
  producer?: string;
  id: number;
  name: string;
  actor: string;
  director: string;
  duration: number;
  description: string;
  year: 0;
  country: string;
  limitAge: number;
  trailer: string;
  startDate: Date;
  endDate: Date;
  category: string;
  image: string;
  poster: string;
  createdOn: Date;
  lastModifiedOn: Date;
  schedules?: Schedule[];
  score: number;
  numberOfVotes?: number;
}
