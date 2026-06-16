import { Component } from '@angular/core';
import { NavComponent } from './sections/nav/nav.component';
import { HeroComponent } from './sections/hero/hero.component';
import { WhyBricksComponent } from './sections/why-bricks/why-bricks.component';
import { GetStartedComponent } from './sections/get-started/get-started.component';
import { FeaturedComponent } from './sections/featured/featured.component';
import { GuidelinesComponent } from './sections/guidelines/guidelines.component';
import { ImpactComponent } from './sections/impact/impact.component';
import { ChangelogComponent } from './sections/changelog/changelog.component';
import { SupportComponent } from './sections/support/support.component';
import { FooterComponent } from './sections/footer/footer.component';
import { CursorComponent } from './shared/cursor/cursor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavComponent,
    HeroComponent,
    WhyBricksComponent,
    GetStartedComponent,
    FeaturedComponent,
    GuidelinesComponent,
    ImpactComponent,
    ChangelogComponent,
    SupportComponent,
    FooterComponent,
    CursorComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
