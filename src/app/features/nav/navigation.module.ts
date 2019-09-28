import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { NavigationContainerComponent } from './containers/navigation-container.component';

const COMPONENTS = [NavigationContainerComponent];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [SharedModule],
    exports: [...COMPONENTS],
})
export class NavigationModule {}
