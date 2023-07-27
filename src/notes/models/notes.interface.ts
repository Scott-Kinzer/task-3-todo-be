import { NOTE_ENUM_CATEGORIES } from './notes.dto';

export interface NotePayload {
  name: string;
  created: Date;
  category: NOTE_ENUM_CATEGORIES;
  content: string;
  isArchive: boolean;
}

export interface Note extends NotePayload {
  id: string;
}
