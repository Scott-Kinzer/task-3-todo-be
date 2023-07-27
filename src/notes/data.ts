import { NOTE_ENUM_CATEGORIES } from './models/notes.dto';
import { Note } from './models/notes.interface';

export const notesData: Note[] = [
  {
    id: '1',
    name: 'Shopping list',
    created: new Date('2022-03-25'),
    category: NOTE_ENUM_CATEGORIES.TASK,
    content: 'Tomatoes, bread',
    isArchive: false,
  },
  {
    id: '2',
    name: 'Theory of evolution',
    created: new Date('2021-04-21'),
    category: NOTE_ENUM_CATEGORIES.THOUGHT,
    content: 'The evolution',
    isArchive: false,
  },
  {
    id: '3',
    name: 'New Feature',
    created: new Date('2022-03-25'),
    category: NOTE_ENUM_CATEGORIES.IDEA,
    content:
      'I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021” the dates column is “3/5/2021, 5/5/2021',
    isArchive: false,
  },
  {
    id: '4',
    name: 'William Gaddis',
    created: new Date('2022-03-25'),
    category: NOTE_ENUM_CATEGORIES.QUOTE,
    content: "Power doesn't make",
    isArchive: false,
  },
  {
    id: '5',
    name: 'Books',
    created: new Date('2022-05-21'),
    category: NOTE_ENUM_CATEGORIES.TASK,
    content: 'The lean startup',
    isArchive: false,
  },
];
