import { Events, EventsResponse } from "../types";
import urlJoin from "url-join";

export async function getAllEvents(
//todo: modify the props to manage pagination filters, filters, etc.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
something:string
): Promise<{
  events: Events[] | null;
  error: string | null;
  total_pages: number;
}> {
  const getAllEventsResponse = await fetch(
    urlJoin(process.env.NEXT_PUBLIC_BASE_URL!, "/events/"),
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  //todo: not sure how the error messages are returened from the API, checkit out during implmentation

  //   if (!getAllEventsResponse.ok) {
  //     const { errorCode } = getAllEventsResponse.json();
  //     return { ticket: null, error: errorCode! };
  //   }

  const { events, total_pages } =
    (await getAllEventsResponse.json()) as EventsResponse;

  return { events, total_pages, error: null };
}
