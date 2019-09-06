import { Component } from '@angular/core';
import {
    ComponentFixture,
    discardPeriodicTasks,
    fakeAsync,
    TestBed,
    tick,
} from '@angular/core/testing';
import { ThemeService, ThemeServiceConfig } from './theme.service';

const TARGET_CLASS = 'test-element';
const TARGET_SELECTOR = '.test-element';
const HTML_ELEMENT = document.documentElement;

@Component({
    template: `
        <!-- in production the <html> or <body> would generally be used -->
        <div class="{{ TARGET_CLASS }}"></div>
    `,
})
class TestComponent {
    TARGET_CLASS = TARGET_CLASS;
}

describe('ThemeService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [],
            declarations: [TestComponent],
        });
    });

    afterEach(() => {
        document.documentElement.className = '';
    });

    const createTestComponent = () => {
        const component: ComponentFixture<
            TestComponent
        > = TestBed.createComponent(TestComponent);
        component.detectChanges();

        const { debugElement, componentInstance, nativeElement } = component;
        const testDiv = nativeElement.firstElementChild as HTMLElement;

        const testDivHasClass = (className: string) => {
            return testDiv.classList.contains(className);
        };

        return {
            debugElement,
            componentInstance,
            testDiv,
            testDivHasClass,
        };
    };

    describe('themes and defaultTheme:', () => {
        it('add the default theme to <html>', fakeAsync(() => {
            const config: ThemeServiceConfig = {
                themes: ['light', 'dark'],
                defaultTheme: 'light',
            };
            const service = new ThemeService(config, document);
            expect(HTML_ELEMENT.classList.contains('light')).toBe(true);
            expect(HTML_ELEMENT.classList.contains('dark')).toBe(false);
        }));

        it('add no default theme if none supplied', fakeAsync(() => {
            // Represents case where :root {} has the default CSS variables
            const config: ThemeServiceConfig = {
                themes: ['light'],
                defaultTheme: '',
            };
            const service = new ThemeService(config, document);
            expect(HTML_ELEMENT.classList.contains('light')).toBe(false);
        }));

        it('incorrect targetElementSelector defaults to <html>', fakeAsync(() => {
            const incorrectSelector = '.incorrect-selector';
            const config: ThemeServiceConfig = {
                themes: ['light', 'dark'],
                defaultTheme: 'light',
                targetElementSelector: incorrectSelector,
            };
            const consoleLogSpy = spyOn(console, 'warn');
            // service wont find .incorrect-class
            const service = new ThemeService(config, document);
            expect(HTML_ELEMENT.classList.contains('light')).toBe(true);
            expect(console.warn).toHaveBeenCalledTimes(2);
        }));

        it('theme styles applied to targetElementSelector', fakeAsync(() => {
            const config: ThemeServiceConfig = {
                themes: ['light', 'dark'],
                defaultTheme: 'light',
                targetElementSelector: TARGET_SELECTOR,
            };
            const { testDiv } = createTestComponent();

            const service = new ThemeService(config, document);
            // check classes havn't been added to the html element
            config.themes.forEach(theme => {
                expect(HTML_ELEMENT.classList.contains(theme)).toBe(false);
            });
            // The testDiv should have the default theme class
            expect(testDiv.classList.contains(config.defaultTheme)).toBe(true);
        }));
    });

    describe('theme switch with observable:', () => {
        const TRANSITION_DURATION = 1000;
        const config: ThemeServiceConfig = {
            themes: ['light', 'dark', 'contrast'],
            defaultTheme: 'light',
            transitionConfig: {
                className: 'theme-transition',
                duration: TRANSITION_DURATION,
            },
            targetElementSelector: TARGET_SELECTOR,
        };

        it('theme & transition classes added to element', fakeAsync(() => {
            const { testDiv, testDivHasClass } = createTestComponent();
            const service = new ThemeService(config, document);
            const transitionClass = config.transitionConfig.className;

            const subscriptionTest = {
                callCount: 0,
                data: '',
            };
            const sub = service.selectedTheme$.subscribe(className => {
                subscriptionTest.callCount += 1;
                subscriptionTest.data = className;
            });

            // Loop through theme classes, checking applied and switching
            config.themes.forEach((themeClass, i, arr) => {
                expect(testDivHasClass(themeClass)).toBe(true, themeClass);
                expect(testDivHasClass(transitionClass)).toBe(true, themeClass);

                // Check the BehaviorSubject subscription
                expect(subscriptionTest.callCount).toEqual(i + 1, themeClass);
                expect(subscriptionTest.data).toEqual(themeClass);

                // Check that transition in progress class remains on
                // element until duration complete
                tick(TRANSITION_DURATION * 0.5);
                expect(testDivHasClass(transitionClass)).toBe(true, themeClass);

                tick(TRANSITION_DURATION * 0.5);
                expect(testDivHasClass(transitionClass)).toBe(
                    false,
                    themeClass
                );

                // Switch theme class (last item check)
                if (i + 1 < arr.length) {
                    service.switchTheme(arr[i + 1]);
                }
            });
            discardPeriodicTasks();
        }));

        it('transition timer cancelled and restarted', fakeAsync(() => {
            const { testDiv, testDivHasClass } = createTestComponent();
            const service = new ThemeService(config, document);
            const transitionClass = config.transitionConfig.className;

            tick(TRANSITION_DURATION * 0.9);
            expect(testDivHasClass(transitionClass)).toBe(true);

            // Previous timer should cancel when theme switched
            service.switchTheme(config.themes[1]);

            tick(TRANSITION_DURATION * 0.2);
            expect(testDivHasClass(transitionClass)).toBe(true);

            tick(TRANSITION_DURATION * 0.7);
            expect(testDivHasClass(transitionClass)).toBe(true);

            tick(TRANSITION_DURATION * 0.1);
            expect(testDivHasClass(transitionClass)).toBe(false);

            discardPeriodicTasks();
        }));
    });
});
