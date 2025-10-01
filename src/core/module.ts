export default class WModule
{
    protected left: HTMLElement;
    protected center: HTMLElement;
    protected right: HTMLElement;

    constructor(left: HTMLElement, center: HTMLElement, right: HTMLElement)
    {
        this.left = left;
        this.center = center;
        this.right = right;
    }
}
