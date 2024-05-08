import { $ } from '@wdio/globals';

export default class PasteComponent {
    get default() {
        return $('.post-view');
    }

    get title() {
        return this.default.$('//div[@class="info-top"]/h1');
    }
    get syntaxHighlight() {
        return $('div.left > a');
    }
}
