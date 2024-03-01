import 'next-auth';

declare module '@heroicons/react/outline';
declare module 'react-star-ratings';


declare module 'next-auth' {
    interface Session {
      accessToken?: string;
    }
  }