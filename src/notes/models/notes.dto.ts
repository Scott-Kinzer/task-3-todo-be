import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { NotePayload } from './notes.interface';

export enum NOTE_ENUM_CATEGORIES {
  TASK = 'task',
  IDEA = 'idea',
  THOUGHT = 'thought',
  QUOTE = 'quote',
}

export class NotePayloadDto implements NotePayload {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  @Transform((value) => new Date(value.value)) // Transform string to Date
  created: Date;

  @IsEnum(NOTE_ENUM_CATEGORIES)
  category: NOTE_ENUM_CATEGORIES;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsBoolean()
  isArchive: boolean;
}

export class NoteDto extends NotePayloadDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
