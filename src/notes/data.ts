import { Note } from './models/notes.interface';

export const notesData: Note[] = [
  {
    id: '1',
    name: 'Shopping list',
    created: new Date('2022-03-25'),
    category: 'task',
    content: 'Tomatoes, bread',
    isArchive: false,
  },
  {
    id: '2',
    name: 'Theory of evolution',
    created: new Date('2021-04-21'),
    category: 'thought',
    content: 'The evolution',
    isArchive: false,
  },
  {
    id: '3',
    name: 'New Feature',
    created: new Date('2022-03-25'),
    category: 'idea',
    content:
      'I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021” the dates column is “3/5/2021, 5/5/2021',
    isArchive: false,
  },
  {
    id: '4',
    name: 'William Gaddis',
    created: new Date('2022-03-25'),
    category: 'quote',
    content: "Power doesn't make",
    isArchive: false,
  },
  {
    id: '5',
    name: 'Books',
    created: new Date('2022-05-21'),
    category: 'task',
    content: 'The lean startup',
    isArchive: false,
  },
];
