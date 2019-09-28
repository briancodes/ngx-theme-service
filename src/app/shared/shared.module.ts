import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';

const MODULES = [CommonModule, FontAwesomeModule, RouterModule];

const COMPONENTS = [ThemeSwitcherComponent];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [...MODULES],
    exports: [...MODULES, ...COMPONENTS],
})
export class SharedModule {}
