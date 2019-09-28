import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-navigation-container',
    template: `
        <nav class="nav-sticky">
            <a [routerLink]="" class="nav-link" role="button">
                <fa-icon [icon]="['fas', 'home']"></fa-icon>
            </a>
            <div class="nav-item-group">
                <app-theme-switcher></app-theme-switcher>
                <a
                    href="https://github.com/briancodes/ngx-theme-service"
                    target="_blank"
                >
                    <fa-icon [icon]="['fab', 'github']"></fa-icon>
                </a>
            </div>
        </nav>
        <nav class="nav-title">
            <h4>
                NgxThemeService with CSS Variables:
            </h4>
            <fa-icon [icon]="['fab', 'sass']"></fa-icon>
            <fa-icon [icon]="['fab', 'css3-alt']"></fa-icon>
        </nav>
    `,
    styleUrls: ['./navigation-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationContainerComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
