import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavigationContainerComponent } from './containers/navigation-container.component';

const COMPONENTS = [NavigationContainerComponent];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, RouterModule, FontAwesomeModule],
    exports: [...COMPONENTS],
})
export class NavigationModule {}
