import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <div class="router-outlet-wrapper">
            <app-navigation-container></app-navigation-container>
            <router-outlet></router-outlet>
        </div>
    `,
    styles: [
        `
            .router-outlet-wrapper {
                position: relative;
            }
        `,
    ],
})
export class AppComponent {}
