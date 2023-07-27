import { NOTE_ENUM_CATEGORIES } from 'src/notes/models/notes.dto';
import { Note } from 'src/notes/models/notes.interface';

export type NoteStats = {
  archive?: number;
  active?: number;
};

export type NoteStatsResult = {
  archive?: number;
  active?: number;
  categoryType: NOTE_ENUM_CATEGORIES;
};

type AccNote = Record<NOTE_ENUM_CATEGORIES, NoteStats>;

export const filterNotes = (notesCopy: Note[]): NoteStatsResult[] => {
  const objectOfNotes = notesCopy.reduce((acc, item) => {
    if (item.isArchive) {
      return {
        ...acc,
        [item.category]: {
          ...acc[item.category],
          archive: acc[item.category]?.archive
            ? (acc[item.category]?.archive as number) + 1
            : 1,
          active: acc[item.category]?.active
            ? (acc[item.category]?.active as number)
            : 0,
        },
      };
    } else {
      // Active
      return {
        ...acc,
        [item.category]: {
          ...acc[item.category],
          active: acc[item.category]?.active
            ? (acc[item.category]?.active as number) + 1
            : 1,
          archive: acc[item.category]?.archive
            ? (acc[item.category]?.archive as number)
            : 0,
        },
      };
    }
  }, {} as AccNote);

  const arrayOfNotes = [];

  for (const noteStats in objectOfNotes) {
    arrayOfNotes.push({
      ...objectOfNotes[noteStats as NOTE_ENUM_CATEGORIES],
      categoryType: noteStats as NOTE_ENUM_CATEGORIES,
    });
  }

  return arrayOfNotes;
};
