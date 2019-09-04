import { ThemeServiceConfig } from '@bcodes/ngx-theme-service';

const themeServiceConfig: ThemeServiceConfig = {
    themes: ['light', 'dark'],
    defaultTheme: 'light',
    transitionConfig: {
        className: 'theme-transition',
        delay: 1500,
    },
};

export const COMMON_CONSTANTS = {
    themeServiceConfig,
};
