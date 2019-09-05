## NgxThemeService

<p align="center">
  <img alt="console.log" height="200px" src="https://user-images.githubusercontent.com/15702512/64343540-9c1ab580-cfe4-11e9-8644-9744b15644ea.gif">
  <br>
  <i>Default light theme with transition</i>
</p>

View the [demo app](https://ngx-theme-service.web.app)

## Install

`npm install @bcodes/ngx-theme-service`

## Configure

Provide the `ThemeServiceConfig` in `AppModule`

```
import { ThemeServiceConfig, THEME_CONFIG } from '@bcodes/ngx-theme-service';

const themeServiceConfig: ThemeServiceConfig = {
    themes: ['light', 'dark'],
    defaultTheme: 'light',
    transitionConfig: {
        className: 'theme-transition',
        delay: 1500
    }
};

providers: [
    {
        provide: THEME_CONFIG,
        useValue: themeServiceConfig
    }
]

```

The `defaultTheme` will always be applied

- If you are using `:root {}` element for your default CSS variables, then set `defaultTheme` to an empty string
- If you prefer the explicit default theme approach, e.g `:root.light`, then set the `defaultTheme` to `'light'`

> Note: `ThemeService` will apply the default theme immediately upon instantiation, so there's no need to add it in `index.html`

By default the theme classes (and optional transition class) will be applied to the `<html>` element. To use a different element add a CSS query selector (uses `document.querySelector` under the hood) to the config `targetElementSelector` property: 

```
{
    themes: ['light', 'dark'],
    defaultTheme: 'light',
    transitionConfig: {
        className: 'theme-transition',
        delay: 1500
    },
    targetElementSelector: 'body'
```

> Demo example: [common.constants.ts](https://github.com/briancodes/ngx-theme-service/blob/master/src/app/shared/common.constants.ts#L3), [app.module.ts](https://github.com/briancodes/ngx-theme-service/blob/master/src/app/app.module.ts#L13)

## Use

Inject `ThemeService` service in the constructor of a component: 

```
constructor(private themeService: ThemeService) {}
```

Switch themes using the `switchTheme` method:

```
this.themeService.switchTheme(themeString);
```

Subscribe to theme changes: 

```
// Component template
<li 
    [class.selected]="(selected$ | async) === 'light'"
>
    Light Theme
</li>

// Component
selected$ = this.themeService.selectedTheme$;
```

> Demo example: [navigation-container.component.ts](https://github.com/briancodes/ngx-theme-service/blob/master/src/app/features/nav/containers/navigation-container.component.ts#L60)

## Style

Example theme styling: 

```
:root.light {
    --theme-background: #fafafa;
}
:root.dark {
    --theme-background: #1b1919;
}

:root.theme-transition,
:root.theme-transition * {
    transition: background-color 1500ms !important;
    transition-delay: 0s !important;
}
```

> Note: you could also use `transition: all 1500ms !important;`

> Demo example: [themes.scss](https://github.com/briancodes/ngx-theme-service/blob/master/src/styles/themes.scss)
