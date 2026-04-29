import { Show } from '@/types/show';

export const SHOWS: Show[] = [
  {
    id: '1',
    title: "GREY'S ANATOMY",
    description:
      'A medical drama about surgeons navigating intense cases, friendships, and complicated relationships at Grey Sloan Memorial Hospital.',
    image: 'https://image.tmdb.org/t/p/w500/daSFbrt8QCXV2hSwB0hqYjbj681.jpg',
    genre: 'Drama',
  },
  {
    id: '2',
    title: 'HIMYM',
    description:
      'A comedy where Ted Mosby tells his kids the long, hilarious story of how he met their mother.',
    image: 'https://image.tmdb.org/t/p/w500/2Jx8kY5x7C5JvYhCzQvP4GZm0kL.jpg',
    genre: 'Comedy',
  },
  {
    id: '3',
    title: 'THE OFFICE',
    description:
      'A mockumentary sitcom following the everyday lives of office employees at Dunder Mifflin, Scranton branch.',
    image: 'https://image.tmdb.org/t/p/w500/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg',
    genre: 'Comedy',
  },
  {
    id: '4',
    title: 'BREAKING BAD',
    description:
      "A high school chemistry teacher turned methamphetamine manufacturer partners with a former student to secure his family's financial future.",
    image: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
    genre: 'Thriller',
  },
  {
    id: '5',
    title: 'STRANGER THINGS',
    description:
      'When a boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one very strange little girl.',
    image: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
    genre: 'Sci-Fi',
  },
  {
    id: '6',
    title: 'FRIENDS',
    description:
      'Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.',
    image: 'https://image.tmdb.org/t/p/w500/f496cm9enuEsZkSPzCwnTESEK5s.jpg',
    genre: 'Comedy',
  },
];

export const FEATURED = SHOWS.slice(0, 4);