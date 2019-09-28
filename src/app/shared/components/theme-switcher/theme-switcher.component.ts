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
    selector: 'app-theme-switcher',
    template: `
        <div #themeSwitcher>
            <a role="button" (click)="handleSwitcherClick($event)">
                <fa-icon [icon]="['fas', 'fill-drip']"></fa-icon>
            </a>
            <ul class="theme-menu" *ngIf="switcherVisible">
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
        </div>
    `,
    styleUrls: ['./theme-switcher.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcherComponent implements OnInit {
    @ViewChild('themeSwitcher', { static: false })
    themeSwitcher: ElementRef<HTMLElement>;

    selected$ = this.themeService.selectedTheme$;

    switcherVisible = false;

    constructor(private themeService: ThemeService) {}

    ngOnInit() {}

    handleSwitcherClick(event: any = null) {
        this.switcherVisible = !this.switcherVisible;
    }

    handleThemeSelected({ currentTarget }, theme: string) {
        if ((currentTarget as HTMLElement).classList.contains('selected')) {
            return;
        }
        this.themeService.switchTheme(theme);
    }

    @HostListener('document:mousedown', ['$event.target'])
    handleMouseDown(target: HTMLElement) {
        if (
            !this.themeSwitcher.nativeElement.contains(target) &&
            this.switcherVisible
        ) {
            this.handleSwitcherClick();
        }
    }
}
