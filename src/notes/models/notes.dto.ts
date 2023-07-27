import { IsString, IsNotEmpty, IsDate, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { NOTE_CATEGORIES } from './notes.interface';

export class NoteDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  @Transform((value) => new Date(value.value)) // Transform string to Date
  created: Date;

  category: NOTE_CATEGORIES;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsBoolean()
  isArchive: boolean;
}
