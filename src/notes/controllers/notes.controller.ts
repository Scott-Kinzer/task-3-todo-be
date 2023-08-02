import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { NotePayloadDto, NoteDto } from '../models/notes.dto';

import { ResultService } from 'src/types';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  async createNote(@Body() note: NotePayloadDto) {
    const result = await this.notesService.createNote(note);

    if (result.status === ResultService.SUCCESS) {
      return {
        statusCode: HttpStatus.OK,
        message: result.message,
        note: result.note,
      };
    } else {
      throw new HttpException(
        'Cannot create note, please try again later',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async removeNote(@Param('id') id: string) {
    const deletionResult = await this.notesService.removeNote(id);

    if (deletionResult.status === ResultService.SUCCESS) {
      return {
        statusCode: HttpStatus.OK,
        message: deletionResult.message,
      };
    } else {
      throw new HttpException(deletionResult.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async editNote(@Param('id') id: string, @Body() note: NoteDto) {
    const editionResult = await this.notesService.editNote(id, note);

    if (editionResult.status === ResultService.SUCCESS) {
      return {
        statusCode: HttpStatus.OK,
        note: editionResult.note,
        message: editionResult.message,
      };
    } else {
      throw new HttpException(
        'Cannot update note, please try again later',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('stats')
  async getNotesStats() {
    const result = await this.notesService.getNotesStats();

    if (result.status === ResultService.SUCCESS) {
      return {
        statusCode: HttpStatus.OK,
        notes: result.notes,
        message: result.message,
      };
    } else {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getNote(@Param('id') id: string) {
    const result = await this.notesService.getNote(id);

    if (result.status === ResultService.SUCCESS) {
      return {
        statusCode: HttpStatus.OK,
        note: result.note,
        message: result.message,
      };
    } else {
      throw new HttpException(
        'Cannot get note, please try again later',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get()
  async getAllNotes() {
    const result = await this.notesService.getNotes();

    if (result.status === ResultService.SUCCESS) {
      return {
        statusCode: HttpStatus.OK,
        notes: result.notes,
        message: result.message,
      };
    } else {
      throw new HttpException(
        'Cannot show note stats, please try again later',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
