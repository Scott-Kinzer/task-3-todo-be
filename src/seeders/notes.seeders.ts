import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NotesRepository } from 'src/notes/repositories/notes.repository';
import { notesData } from 'src/notes/data';

@Injectable()
export class NotesSeed {
  constructor(
    @InjectModel(NotesRepository)
    private readonly notes: typeof NotesRepository,
  ) {}

  async seed() {
    await this.notes.destroy({ where: {} });
    await this.notes.bulkCreate(notesData);
  }
}
