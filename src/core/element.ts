class WElement
{
    public readonly html: HTMLElement;

    constructor(html: () => string, css: () => string)
    {
        // html
        const container = document.createElement("div");
        container.innerHTML = html();
        this.html = container.firstElementChild as HTMLElement;

        // css
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(css());
        document.adoptedStyleSheets.push(sheet);
    }

    public destroy(): void
    {
        this.html.remove();
    }
}

export default WElement;
