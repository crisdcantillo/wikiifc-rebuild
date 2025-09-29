import WPanelHead from "../../shared/panel-head";
import WPanelHeadOption from "../../shared/panel-head-option";
import WSpinner from "../../shared/spinner";
import Assets from "../../utils/assets";
import DateFormatter from "../../utils/date";
import WFileItem from "./file-item";
import WFileList from "./file-list";
import WShareItem from "./share-item";
import WShareList from "./share-list";
import WConfirm from "../../shared/confirm";
import WCollapser from "../../shared/collapser";
import WDetailsTable from "../../shared/details-table";
import { WDetailsTableItem } from "../../shared/details-table-item";
import WEmpty from "../../shared/empty";
import FilesService from "../../services/files";

export default class FilesModule
{
    private left: HTMLElement;
    private right: HTMLElement;

    private head: WPanelHead;
    private fileList: WFileList;
    private shareList: WShareList;

    public onModelLoaded: ((fileId: string) => void) | null = null;

    constructor(left: HTMLElement, right: HTMLElement)
    {
        this.left = left;
        this.right = right;
        this.head = new WPanelHead("Files");
        this.fileList = new WFileList();
        this.shareList = new WShareList();

        this.left.appendChild(this.head.html);
        this.left.appendChild(this.fileList.html);

        this.addHead();
    }

    private addHead(): void
    {
        const uploadFile = new WPanelHeadOption(Assets.cloudUpload, "Upload");
        this.head.addOptions([uploadFile]);
    }

    public showEmptyFiles(message: string): void
    {
        const empty = new WEmpty("warning", message);
        this.fileList.html.replaceChildren();
        this.fileList.html.appendChild(empty.html);
        this.right.replaceChildren();
    }

    public showEmptyShareList(message: string): void
    {
        const empty = new WEmpty("warning", message);
        this.shareList.html.appendChild(empty.html);
    }

    public async showFiles(): Promise<void>
    {
        const spinner = new WSpinner();

        this.fileList.clear();
        this.fileList.html.appendChild(spinner.html);

        const files = await FilesService.getFiles();

        if (files.items.length <= 0)
        {
            spinner.destroy();
            this.showEmptyFiles("No files yet...");
            return;
        }

        let selectedId = "";
        const items = files.items?.map(i =>
        {
            const item = new WFileItem(i.id, i.name, DateFormatter.format(i.created));
            item.onClick = () =>
            {
                items?.forEach(i => i.html.classList.remove("active"));
                item.html.classList.add("active");
                selectedId = i.id;

                this.onEventModelLoaded(i.id);
                this.showFileDetails(i.id);
            }

            item.onDelete = () =>
            {
                const confirm = new WConfirm(item.html, "left", "Are you sure?");
                confirm.onConfirm = () =>
                {
                    item.destroy();

                    // if deleting the selected item, then clear right
                    if (item.id === selectedId) this.right.replaceChildren();

                    // if no more files after deleting last file, show empty message
                    if (this.fileList.html.children.length <= 0)
                        this.showEmptyFiles("You don't have any files yet");
                }

            }

            return item;
        });

        spinner.destroy();
        this.fileList.addItems(items ?? []);
        this.left.appendChild(this.fileList.html);
    }

    public async showFileDetails(id: string): Promise<void>
    {
        this.shareList = new WShareList();
        const collapserDetails = new WCollapser("File details");
        const collapserShare = new WCollapser("Shared with");
        const tableDetails = new WDetailsTable();
        const spinner = new WSpinner();

        this.right.replaceChildren(spinner.html);
        const fileDetail = await FilesService.getFile(id);
        const sharedList = await FilesService.getSharedList(id);

        tableDetails.addItems([ new WDetailsTableItem("File name", fileDetail.data?.name ?? "" )]);
        this.shareList.addItems(sharedList.items?.map(i => new WShareItem(i.name, i.email)) ?? []);

        if (sharedList.items.length <= 0)
            this.showEmptyShareList("Start sharing your file...");

        const items = sharedList.items?.map((i) =>
        {
            const item = new WShareItem(i.name, i.email);

            item.onDelete = () =>
            {
                item.destroy();

                if (sharedList.items.length <= 0)
                    this.showEmptyShareList("Start sharing your file...");
            }

            return item;
        })

        this.shareList.addItems(items ?? []);

        spinner.destroy();
        collapserDetails.appendContent(tableDetails.html);
        collapserShare.appendContent(this.shareList.html);

        this.right.appendChild(collapserDetails.html);
        this.right.appendChild(collapserShare.html);
    }

    private onEventModelLoaded(fileId: string): void
    {
        if (!this.onModelLoaded) return;
        this.onModelLoaded(fileId);
    }
}
