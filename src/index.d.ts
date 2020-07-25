interface Session {
  text?: string;
  typing: string;
  createdAt?: string;
}

interface Tutorial {
  compose: boolean,
  summary: boolean,
  sessions: boolean
}

declare module 'trix';

declare module 'html-to-react';