import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeContainerComponent } from './home/containers/home-container.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: `home`,
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeContainerComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FeaturesRoutingModule {}
