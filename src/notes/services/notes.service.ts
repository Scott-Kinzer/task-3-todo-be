import { Injectable } from '@nestjs/common';
import { Note, NotePayload } from '../models/notes.interface';
import { notesData } from '../data';
import { v4 as uuid } from 'uuid';

let notesDataCopy = notesData;

@Injectable()
export class NotesService {
  async createNote(user: NotePayload): Promise<Note | null> {
    try {
      const uniqueId = uuid();

      notesDataCopy.push({ ...user, id: uniqueId });

      return notesDataCopy[notesDataCopy.length - 1];
    } catch {
      return null;
    }
  }

  async removeNote(id: string): Promise<{ status: string; message: string }> {
    try {
      const currentNote = notesDataCopy.find((note) => note.id == id);

      if (currentNote) {
        notesDataCopy = notesDataCopy.filter((note) => note.id !== id);

        return { status: 'success', message: 'Note deleted' };
      } else {
        return { status: 'failed', message: 'Note not exists' };
      }
    } catch {
      return { status: 'failed', message: 'Something went wrong...' };
    }
  }

  async editNote(id: string, updatedNote: Note): Promise<Note | null> {
    delete updatedNote.id;

    try {
      notesDataCopy = notesDataCopy.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            ...updatedNote,
          };
        } else {
          return note;
        }
      });

      return notesDataCopy.find((note) => note.id === id);
    } catch {
      return null;
    }
  }
}
