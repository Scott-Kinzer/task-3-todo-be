import { Injectable } from '@nestjs/common';
import { Note, NotePayload } from '../models/notes.interface';
import { notesData } from '../data';
import { v4 as uuid } from 'uuid';
import { ResultService } from 'src/types';
import { NoteStatsResult, filterNotes } from 'src/helpers/filterNotes';

let notesDataCopy = notesData;

@Injectable()
export class NotesService {
  async createNote(
    user: NotePayload,
  ): Promise<{ note: Note | null; status: ResultService; message: string }> {
    try {
      const uniqueId = uuid();

      notesDataCopy.push({ ...user, id: uniqueId });

      if (notesDataCopy[notesDataCopy.length - 1]) {
        return {
          note: notesDataCopy[notesDataCopy.length - 1],
          status: ResultService.SUCCESS,
          message: 'Note created',
        };
      } else {
        return {
          note: null,
          status: ResultService.FAILED,
          message: 'Cannot create note',
        };
      }
    } catch {
      return {
        note: null,
        status: ResultService.FAILED,
        message: 'Something went wrong...',
      };
    }
  }

  async removeNote(
    id: string,
  ): Promise<{ status: ResultService; message: string }> {
    try {
      const currentNote = notesDataCopy.find((note) => note.id == id);

      if (currentNote) {
        notesDataCopy = notesDataCopy.filter((note) => note.id !== id);

        return { status: ResultService.SUCCESS, message: 'Note deleted' };
      } else {
        return { status: ResultService.FAILED, message: 'Note not exists' };
      }
    } catch {
      return {
        status: ResultService.FAILED,
        message: 'Something went wrong...',
      };
    }
  }

  async editNote(
    id: string,
    updatedNote: Note,
  ): Promise<{ note: Note | null; status: ResultService; message: string }> {
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

      const note = notesDataCopy.find((note) => note.id === id);

      if (note) {
        return {
          note: note,
          status: ResultService.SUCCESS,
          message: 'Note updated',
        };
      } else {
        return {
          note: null,
          status: ResultService.FAILED,
          message: 'Note not exists',
        };
      }
    } catch {
      return {
        note: null,
        status: ResultService.FAILED,
        message: 'Something went wrong..',
      };
    }
  }

  async getNote(
    id: string,
  ): Promise<{ note: Note | null; status: ResultService; message: string }> {
    try {
      const currentNote = notesDataCopy.find((note) => note.id == id);

      if (currentNote) {
        return {
          note: currentNote,
          status: ResultService.SUCCESS,
          message: 'Note finded',
        };
      } else {
        return {
          note: null,
          status: ResultService.FAILED,
          message: 'Note not exists',
        };
      }
    } catch {
      return {
        note: null,
        status: ResultService.FAILED,
        message: 'Something went wrong...',
      };
    }
  }

  async getNotes(): Promise<{
    notes: Note[] | null;
    status: ResultService;
    message: string;
  }> {
    try {
      return {
        notes: notesDataCopy,
        status: ResultService.SUCCESS,
        message: 'Notes finded',
      };
    } catch {
      return {
        notes: null,
        status: ResultService.FAILED,
        message: 'Something went wrong...',
      };
    }
  }

  async getNotesStats(): Promise<{
    notes: NoteStatsResult[] | null;
    status: ResultService;
    message: string;
  }> {
    try {
      const filteredNotes = filterNotes(notesDataCopy);

      return {
        notes: filteredNotes,
        status: ResultService.SUCCESS,
        message: 'Notes stats',
      };
    } catch {
      return {
        notes: null,
        status: ResultService.FAILED,
        message: 'Something went wrong...',
      };
    }
  }
}
