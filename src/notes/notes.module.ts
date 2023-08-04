import { Module } from '@nestjs/common';
import { NotesService } from './services/notes.service';
import { NotesController } from './controllers/notes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotesRepository } from './repositories/notes.repository';
import { NotesSeed } from 'src/seeders/notes.seeders';

@Module({
  providers: [NotesService, NotesSeed],
  imports: [SequelizeModule.forFeature([NotesRepository])],
  controllers: [NotesController],
})
export class NotesModule {}
