import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-home',
    template: `
        <article class="content" [innerHTML]="componentHTML"></article>
    `,
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
    @Input()
    componentHTML: string;

    constructor() {}

    ngOnInit() {}
}
