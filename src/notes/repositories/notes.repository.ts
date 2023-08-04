import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { NOTE_ENUM_CATEGORIES } from '../models/notes.dto';
import { Note } from '../models/notes.interface';

@Table({ timestamps: false, omitNull: true })
export class NotesRepository extends Model<Note> {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.DATE,
  })
  created: Date;

  @Column({
    type: DataType.ENUM(...Object.values(NOTE_ENUM_CATEGORIES)),
  })
  category: NOTE_ENUM_CATEGORIES;

  @Column({
    type: DataType.STRING,
  })
  content: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  isArchive: boolean;
}
