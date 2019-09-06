import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostListener,
    OnInit,
    ViewChild,
} from '@angular/core';
import { ThemeService } from '@bcodes/ngx-theme-service';

@Component({
    selector: 'app-navigation-container',
    template: `
        <nav class="nav-sticky">
            <a [routerLink]="" class="nav-link" role="button">
                <fa-icon [icon]="['fas', 'home']"></fa-icon>
            </a>
            <div class="nav-item-group">
                <a
                    #switcherButton
                    [routerLink]=""
                    role="button"
                    (click)="handleSwitcherClick($event)"
                >
                    <fa-icon [icon]="['fas', 'fill-drip']"></fa-icon>
                </a>
                <a
                    href="https://github.com/briancodes/ngx-theme-service"
                    target="_blank"
                >
                    <fa-icon [icon]="['fab', 'github']"></fa-icon>
                </a>
            </div>
            <ul #themeSwitcher class="theme-switcher" *ngIf="switcherVisible">
                <li
                    (click)="handleThemeSelected($event, 'light')"
                    [class.selected]="(selected$ | async) === 'light'"
                >
                    <fa-icon [icon]="['fas', 'sun']"></fa-icon>
                </li>
                <li
                    (click)="handleThemeSelected($event, 'dark')"
                    [class.selected]="(selected$ | async) === 'dark'"
                >
                    <fa-icon [icon]="['fas', 'star-and-crescent']"></fa-icon>
                </li>
            </ul>
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
    @ViewChild('themeSwitcher', { static: false })
    themeSwitcher: ElementRef;

    @ViewChild('switcherButton', { static: false })
    switcherButton: ElementRef;

    selected$ = this.themeService.selectedTheme$;

    switcherVisible = false;

    constructor(private themeService: ThemeService) {}

    ngOnInit() {}

    handleSwitcherClick(event: any = null) {
        this.switcherVisible = !this.switcherVisible;
    }

    handleThemeSelected(event: MouseEvent, theme: string) {
        if (
            (event.currentTarget as HTMLElement).classList.contains('selected')
        ) {
            return;
        }
        this.themeService.switchTheme(theme);
    }

    @HostListener('document:mousedown', ['$event.target'])
    handleMouseDown(target: HTMLElement) {
        // Filter out undefined elements rather than null checks - one's in an *ngIf
        const nativeElements = [
            this.switcherButton ? this.switcherButton.nativeElement : undefined,
            this.themeSwitcher ? this.themeSwitcher.nativeElement : undefined,
        ].filter(elem => !!elem);

        // Check if clicked outside elements
        if (
            nativeElements.every((e: HTMLElement) => !e.contains(target)) &&
            this.switcherVisible
        ) {
            this.handleSwitcherClick();
        }
    }
}
