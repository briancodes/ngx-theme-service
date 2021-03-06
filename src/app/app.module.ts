import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { THEME_CONFIG } from '@bcodes/ngx-theme-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeaturesModule } from './features/features.module';
import { IconsModule } from './icons.module';
import { COMMON_CONSTANTS } from './shared/common.constants';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, FeaturesModule, IconsModule],
    providers: [
        {
            provide: THEME_CONFIG,
            useValue: COMMON_CONSTANTS.themeServiceConfig,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
