import { Injectable } from '@nestjs/common';
import { Note, NotePayload } from '../models/notes.interface';
import { v4 as uuid } from 'uuid';
import { ResultService } from 'src/types';
import { NoteStatsResult, filterNotes } from 'src/helpers/filterNotes';
import { InjectModel } from '@nestjs/sequelize';
import { NotesRepository } from '../repositories/notes.repository';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(NotesRepository)
    private notesRepository: typeof NotesRepository,
  ) {}
  async createNote(
    note: NotePayload,
  ): Promise<{ note: Note | null; status: ResultService; message: string }> {
    try {
      const uniqueId = uuid();

      const createdNote = await this.notesRepository.create({
        ...note,
        id: uniqueId,
      });

      if (createdNote) {
        return {
          note: createdNote,
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
      const removeResult = await this.notesRepository.destroy({
        where: { id },
      });

      if (removeResult === 1) {
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
      const updatedNoteResult = await this.notesRepository.update(
        {
          ...updatedNote,
        },
        { where: { id } },
      );

      const updatedNoteObject = await this.getNote(id);

      if (updatedNoteResult) {
        return {
          note: updatedNoteObject.note,
          status: ResultService.SUCCESS,
          message: 'Note updated',
        };
      } else {
        return {
          note: null,
          status: ResultService.FAILED,
          message: 'Cannot update note',
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
      const currentNote = await this.notesRepository.findOne({ where: { id } });

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
      const notes = await this.notesRepository.findAll();

      return {
        notes: notes,
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
      const notesResult = await this.getNotes();

      if (notesResult.status === ResultService.SUCCESS) {
        const filteredNotes = filterNotes(notesResult.notes);

        return {
          notes: filteredNotes,
          status: ResultService.SUCCESS,
          message: 'Notes stats',
        };
      } else {
        return {
          notes: null,
          status: ResultService.FAILED,
          message: 'Something went wrong...',
        };
      }
    } catch {
      return {
        notes: null,
        status: ResultService.FAILED,
        message: 'Something went wrong...',
      };
    }
  }
}
