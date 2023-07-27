import { Injectable } from '@nestjs/common';
import { Note } from '../models/notes.interface';
import { notesData } from '../data';

@Injectable()
export class NotesService {
  async createNote(user: Note): Promise<any> {
    notesData.push(user);

    return user;
  }
}
