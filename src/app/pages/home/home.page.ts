import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NotesService, Note } from '../../services/notes';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  notes: Note[] = [];
  search = '';

  constructor(private notesService: NotesService) {}

  async ionViewWillEnter() {
    this.notes = await this.notesService.getNotes();
  }

  get filteredNotes(): Note[] {
    const t = this.search.toLowerCase();
    return this.notes.filter(n =>
      n.title.toLowerCase().indexOf(t) !== -1 ||
      n.content.toLowerCase().indexOf(t) !== -1
    );

  }

  async delete(note: Note) {
    await this.notesService.deleteNote(note.id);
    this.notes = await this.notesService.getNotes();
  }

  format(ts: number): string {
    return new Date(ts).toLocaleString();
  }
}
