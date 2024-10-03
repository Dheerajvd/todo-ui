import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cache } from "./shared/services/cache.service";

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private cache: Cache) { }
}
