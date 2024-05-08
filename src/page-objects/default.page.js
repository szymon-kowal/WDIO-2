import { browser } from '@wdio/globals';

export default class DefaultPage {
    async open(url) {
        await browser.url(url);
    }
}
