import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { HomeContainerComponent } from './containers/home-container.component';

const COMPONENTS = [HomeContainerComponent, HomeComponent];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, RouterModule],
})
export class HomeModule {}
