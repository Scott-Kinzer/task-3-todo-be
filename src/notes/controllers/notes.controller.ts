import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { NotePayloadDto, NoteDto } from '../models/notes.dto';
import { Note } from '../models/notes.interface';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  async createNote(@Body() note: NotePayloadDto): Promise<Note> {
    const createdNote = await this.notesService.createNote(note);

    if (createdNote) {
      return createdNote;
    } else {
      throw new HttpException('Cannot create note', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async removeNote(@Param('id') id: string) {
    const deletionResult = await this.notesService.removeNote(id);

    if (deletionResult.status === 'success') {
      return {
        statusCode: 200,
        message: 'Note deleted',
      };
    } else {
      throw new HttpException('Note not found', HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  async editNote(@Param('id') id: string, @Body() note: NoteDto) {
    const editionResult = await this.notesService.editNote(id, note);

    if (!editionResult) {
      throw new HttpException(
        'Cannot update note, please try again later',
        HttpStatus.NOT_FOUND,
      );
    }

    return editionResult;
  }
}
