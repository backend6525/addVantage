// src/mocks/handlers.ts
import { http } from 'msw';

export const handlers = [
  http.post('/api/user/getUser', ({ request }) => {
    return new Response(
      JSON.stringify([
        {
          name: 'John Doe',
          email: 'john.doe@example.com',
          picture: 'http://example.com/john.jpg',
          phone: '1234567890',
          location: 'New York',
        },
      ]),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }),
];