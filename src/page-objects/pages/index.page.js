import DefaultPage from '../default.page.js';
import { $ } from '@wdio/globals';

export default class IndexPage extends DefaultPage {
    async open() {
        await super.open('https://pastebin.com/');
    }
    get textArea() {
        return $('.form-group #postform-text');
    }

    get syntaxHighlightingInput() {
        return $('//span[@id="select2-postform-format-container"]');
    }

    syntaxHighlightingOption(optionStr) {
        return $(
            `//li[@class="select2-results__option"][contains(text(),"${optionStr}")]`
        );
    }

    get expirationSpan() {
        return $('#select2-postform-expiration-container[role="textbox"]');
    }

    get expirationSpanPopup() {
        return $('#select2-postform-expiration-results');
    }

    chooseOption(optionNameStr) {
        return $(`li[id$="${optionNameStr}"]`);
    }

    get titleInputField() {
        return $('#postform-name');
    }

    get submitBtn() {
        return $('.btn.-big');
    }

    async removePopups() {
        await this.closePopupIfDisplayed('.css-47sehv', 'Cookie popup');
        await this.closePopupIfDisplayed(
            '#hideSlideBanner',
            'Advertising banner'
        );
    }

    async closePopupIfDisplayed(selector, description = '') {
        try {
            const element = await $(selector);
            if (
                await element.waitForDisplayed({
                    timeout: 3000,
                    reverse: false,
                })
            ) {
                await element.click();
            }
        } catch (error) {
            console.log(
                `${description} is not displayed or not clickable:`,
                error.message
            );
        }
    }
}
