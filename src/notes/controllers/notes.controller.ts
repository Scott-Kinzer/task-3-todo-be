import { Body, Controller, Post } from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { NoteDto } from '../models/notes.dto';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  create(@Body() note: NoteDto): Promise<any> {
    return this.notesService.createNote(note);
  }
}
