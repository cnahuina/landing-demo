import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ChangelogEntry {
  version: string;
  date: string;
  type: string;
  active: boolean;
  title: string;
  description: string;
}

@Component({
  selector: 'app-changelog',
  standalone: true,
  templateUrl: './changelog.component.html',
  styleUrl: './changelog.component.scss'
})
export class ChangelogComponent {
  private readonly http = inject(HttpClient);

  readonly entries = signal<ChangelogEntry[]>([]);

  constructor() {
    this.http.get<ChangelogEntry[]>('changelog.json').subscribe((data) => {
      this.entries.set((data ?? []).slice(0, 3));
    });
  }
}
