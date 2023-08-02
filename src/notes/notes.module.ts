import { Module } from '@nestjs/common';
import { NotesService } from './services/notes.service';
import { NotesController } from './controllers/notes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotesRepository } from './repositories/notes.repository';

@Module({
  providers: [NotesService],
  imports: [SequelizeModule.forFeature([NotesRepository])],
  controllers: [NotesController],
})
export class NotesModule {}
