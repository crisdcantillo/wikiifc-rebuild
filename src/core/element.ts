/**
* @description class that every custom element should extend to keep consistency
*/
class WElement
{
    protected element: HTMLElement;

    constructor(html: () => string, css: () => string)
    {
        // html
        const container = document.createElement("div");
        container.innerHTML = html();
        this.element = container.firstElementChild as HTMLElement;

        // css
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(css());
        document.adoptedStyleSheets.push(sheet);
    }

    public get html()
    {
        return this.element;
    }

    public destroy(): void
    {
        this.element.remove();
    }
}

export default WElement;
