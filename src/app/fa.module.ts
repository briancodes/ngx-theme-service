import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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

const FA_BRAND_ICONS = [faGithub, faCss3Alt, faSass];
const FA_SOLID_ICONS = [faFillDrip, faHome, faMoon, faSun, faStarAndCrescent];

@NgModule({
    declarations: [],
    imports: [CommonModule, FontAwesomeModule],
})
export class FAModule {
    constructor(library: FaIconLibrary) {
        // @see https://golb.hplar.ch/2019/02/fa.html
        library.addIcons(...FA_BRAND_ICONS, ...FA_SOLID_ICONS);
    }
}
