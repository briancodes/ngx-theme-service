import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, InjectionToken, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

/** Apply a CSS class to the `<html>` element when switching themes */
export interface ThemeTransitionConfig {
    readonly className: string;
    /** remove class after delay in milliseconds */
    readonly delay: number;
}

export interface ThemeServiceConfig {
    readonly themes: ReadonlyArray<string>;
    /** theme that should always be on `<html>` element */
    readonly defaultTheme?: string;
    /** optional transition configuration */
    readonly transitionConfig?: ThemeTransitionConfig;
    /** themes applied to <html> by default. Supply CSS selector to change */
    readonly targetElementSelector?: string;
}

export const THEME_CONFIG = new InjectionToken<ThemeServiceConfig>(
    'ThemeService: Config'
);

// https://angular.io/guide/angular-compiler-options#strictmetadataemit
// @dynamic
@Injectable({
    providedIn: 'root',
})
export class ThemeService implements OnDestroy {
    private stopListening$ = new Subject<boolean>();
    private selectedTheme: BehaviorSubject<string>;
    selectedTheme$: Observable<string>;

    constructor(
        @Inject(THEME_CONFIG) private config: ThemeServiceConfig,
        @Inject(DOCUMENT) private document: Document
    ) {
        this.selectedTheme = new BehaviorSubject(
            this.config.defaultTheme || ''
        );
        this.selectedTheme$ = this.selectedTheme.asObservable();
        this.globalThemeSubscribe();
    }

    switchTheme(className: string) {
        this.selectedTheme.next(className);
    }

    private globalThemeSubscribe() {
        const transitionConfig = this.config.transitionConfig;
        const nonDefaultThemes = this.config.themes.filter(
            c => c !== this.config.defaultTheme
        );

        this.selectedTheme
            .pipe(
                tap(theme => {
                    this.removeClasses(nonDefaultThemes);
                    // Conditional literal entries:
                    // https://2ality.com/2017/04/conditional-literal-entries.html
                    const toAdd = [
                        ...(theme ? [theme] : []),
                        ...(transitionConfig
                            ? [transitionConfig.className]
                            : []),
                    ];
                    this.addClasses(toAdd);
                }),
                transitionConfig
                    ? switchMap(value => {
                          return timer(transitionConfig.delay).pipe(
                              tap(x => {
                                  this.removeClasses([
                                      transitionConfig.className,
                                  ]);
                              })
                          );
                      })
                    : tap((x: any) => {}),
                takeUntil(this.stopListening$)
            )
            .subscribe();
    }

    private removeClasses(arr: string[]) {
        this.targetElement.classList.remove(...arr);
    }

    private addClasses(arr: string[]) {
        this.targetElement.classList.add(...arr);
    }

    private get targetElement(): HTMLElement {
        let elem: HTMLElement;
        if (this.config.targetElementSelector) {
            elem = this.document.querySelector(
                this.config.targetElementSelector
            );
            if (!elem) {
                console.warn(
                    `${this.config.targetElementSelector} not found, defaulting to <html>`
                );
            }
        }
        if (!elem) {
            elem = this.document.documentElement;
        }
        return elem;
    }

    ngOnDestroy(): void {
        this.stopListening$.next(true);
    }
}
