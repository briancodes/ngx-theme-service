import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { THEME_CONFIG } from '@bcodes/ngx-theme-service';
import {
    FaIconLibrary,
    FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
    faCss3Alt,
    faGithub,
    faSass,
} from '@fortawesome/free-brands-svg-icons';
import {
    faFillDrip,
    faHome,
    faMoon,
    faStarAndCrescent,
    faSun,
} from '@fortawesome/free-solid-svg-icons';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeaturesModule } from './features/features.module';
import { COMMON_CONSTANTS } from './shared/common.constants';

const FA_BRAND_ICONS = [faGithub, faCss3Alt, faSass];
const FA_SOLID_ICONS = [faFillDrip, faHome, faMoon, faSun, faStarAndCrescent];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FeaturesModule,
        FontAwesomeModule,
    ],
    providers: [
        {
            provide: THEME_CONFIG,
            useValue: COMMON_CONSTANTS.themeServiceConfig,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(library: FaIconLibrary) {
        // @see https://golb.hplar.ch/2019/02/fa.html
        library.addIcons(...FA_BRAND_ICONS, ...FA_SOLID_ICONS);
    }
}
