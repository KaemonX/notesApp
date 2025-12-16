import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService, Note } from '../../services/notes';
import { QuoteService } from '../../services/quote.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss']
})
export class NotePage {

  note: Note = {
    id: '',
    title: '',
    content: '',
    createdAt: 0,
    updatedAt: 0
  };

  isNew = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notesService: NotesService,
    private quoteService: QuoteService,
    private toastCtrl: ToastController
  ) {}

  ionViewWillEnter() {
    this.loadNote();
  }

  async loadNote() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      const existing = await this.notesService.getNote(id);
      if (existing) {
        this.note = { ...existing };
        this.isNew = false;
        return;
      }
    }

    this.note = {
      id: crypto.randomUUID(),
      title: '',
      content: '',
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    this.isNew = true;
  }

  async save() {
    if (!this.note.title && !this.note.content) {
      this.router.navigate(['/home']);
      return;
    }

    if (this.isNew) {
      this.note.createdAt = Date.now();
    }

    this.note.updatedAt = Date.now();

    await this.notesService.saveNote(this.note);
    this.router.navigate(['/home']);
  }

  async insertRandomQuote() {
    try {
      const quote = await this.quoteService.getRandomQuote();

      if (this.note.content?.length) {
        this.note.content += '\n\n' + quote;
      } else {
        this.note.content = quote;
      }

    } catch {
      const toast = await this.toastCtrl.create({
        message: 'Nepodařilo se načíst citát',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }

}
