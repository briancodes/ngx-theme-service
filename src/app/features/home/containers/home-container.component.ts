import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as marked from 'marked';
import * as homePageMarkdown from 'raw-loader!README.md';

@Component({
    selector: 'app-home-container',
    template: `
        <app-home [componentHTML]="markdown"></app-home>
    `,
    styles: [''],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeContainerComponent implements OnInit {
    markdown: string;

    constructor() {}

    ngOnInit() {
        this.markdown = marked(homePageMarkdown);
    }
}
