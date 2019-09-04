import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeaturesRoutingModule } from './features-routing.module';
import { HomeModule } from './home/home.module';
import { NavigationModule } from './nav/navigation.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, FeaturesRoutingModule],
    exports: [NavigationModule, HomeModule],
})
export class FeaturesModule {}
