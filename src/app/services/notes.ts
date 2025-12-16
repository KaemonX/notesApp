import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

@Injectable({ providedIn: 'root' })
export class NotesService {

  private STORAGE_KEY = 'notes';

  async getNotes(): Promise<Note[]> {
    const res = await Preferences.get({ key: this.STORAGE_KEY });
    return res.value ? JSON.parse(res.value) : [];
  }

  async getNote(id: string): Promise<Note | undefined> {
    const notes = await this.getNotes();
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === id) {
        return notes[i];
      }
    }
    return undefined;

  }

  async saveNote(note: Note): Promise<void> {
    const notes = await this.getNotes();
    let index = -1;
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === note.id) {
        index = i;
        break;
      }
    }


    if (index === -1) {
      notes.unshift(note);
    } else {
      notes[index] = note;
    }

    await Preferences.set({
      key: this.STORAGE_KEY,
      value: JSON.stringify(notes)
    });
  }

  async deleteNote(id: string): Promise<void> {
    const notes = (await this.getNotes()).filter(n => n.id !== id);
    await Preferences.set({
      key: this.STORAGE_KEY,
      value: JSON.stringify(notes)
    });
  }
}
