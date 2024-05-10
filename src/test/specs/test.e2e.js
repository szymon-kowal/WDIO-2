import PasteComponent from '../../page-objects/components/paste.component.js';
import IndexPage from '../../page-objects/pages/index.page.js';
import { expect } from 'chai';
import { browser } from '@wdio/globals';
const indexPage = new IndexPage();
const pasteComponent = new PasteComponent();

describe('pastebin New Paste', () => {
    beforeEach(async () => {
        await indexPage.open();

        // // Mock paste to read input
        // await browser.url('https://pastebin.com/uQrPGkjx');
        await indexPage.removePopups();
    });
    it('Should display valid input data on newly created paste', async () => {
        const inputStr = [
            'git config --global user.name "New Sheriff in Town"',
            'git reset $(git commit-tree HEAD^{tree} -m "Legacy code")',
            'git push origin master --force',
        ];
        const inputSyntax = 'Bash';
        const inputTitle = 'how to gain dominance among developers';

        const textArea = await indexPage.textArea;

        for (let i = 0; i < inputStr.length; i++) {
            await textArea.addValue(inputStr[i]);
            await browser.keys('Enter');
        }

        await indexPage.syntaxHighlightingInput.click();

        await indexPage.syntaxHighlightingOption(inputSyntax).click();

        await indexPage.expirationSpan.click();

        await indexPage.chooseOption('10M').click();

        await indexPage.titleInputField.setValue(inputTitle);

        await indexPage.submitBtn.click();

        // Need it because of browser.execute() later

        const allHandles = await browser.getWindowHandles();

        await browser.switchToWindow(allHandles[allHandles.length - 1]);

        await indexPage.removePopups();

        // Read data from page

        await pasteComponent.title.waitForDisplayed({
            timeout: 3000,
            reverse: false,
        });

        const noteTitleText = await pasteComponent.title.getText();

        const syntaxHighlightingNoteText =
            await pasteComponent.syntaxHighlight.getText();

        const actualText = await browser.execute(() => {
            const elements = document.querySelectorAll('.de1');
            return Array.from(elements).map((element) => element.textContent);
        });

        let browserTitle = await browser.getTitle();
        const trimmedBrowserTitle = browserTitle.split('-')[0].trim();

        expect(trimmedBrowserTitle).to.equal(inputTitle);
        expect(noteTitleText).to.equal(inputTitle);
        expect(syntaxHighlightingNoteText).to.equal(inputSyntax);
        inputStr.forEach((text, idx) => {
            expect(text).to.equal(actualText[idx]);
        });
    });
});
