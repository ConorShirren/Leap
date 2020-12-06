import { Component, HostBinding } from '@angular/core';
import { ColorSchemeService } from 'src/app/core/services/color-scheme.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    title = 'Leap Perforamce Analysis Engine';

    constructor(private colorSchemeService: ColorSchemeService) {
        // Load Color Scheme
        this.colorSchemeService.load();
    }

}
