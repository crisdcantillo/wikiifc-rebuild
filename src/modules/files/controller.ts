import WPanelHead from "../../shared/panel-head";
import WPanelHeadOption from "../../shared/panel-head-option";
import WSpinner from "../../shared/spinner";
import Assets from "../../core/assets";
import DateFormatter from "../../utils/date";
import WFileItem from "./file-item";
import WFileList from "./file-list";
import WShareItem from "./share-item";
import WShareList from "./share-list";
import WCollapser from "../../shared/collapser";
import WDetailsTable from "../../shared/details-table";
import { WDetailsTableItem } from "../../shared/details-table-item";
import WEmpty from "../../shared/empty";
import FilesService from "../../services/files";
import WModule from "../../core/module";
import { AuthStorage } from "../../storages/auth-storage";
import { FilesStorage } from "../../storages/files-storage";

export default class FilesModule extends WModule
{
    private head: WPanelHead;
    private fileList: WFileList;
    private shareList: WShareList;

    constructor(left: HTMLElement, center: HTMLElement, right: HTMLElement)
    {
        super(left, center, right);
        this.fileList = new WFileList();
        this.shareList = new WShareList();
        this.head = new WPanelHead("Files");

        this.left.appendChild(this.head.html);
        this.left.appendChild(this.fileList.html);

        const uploadFile = new WPanelHeadOption(Assets.cloudUpload, "Upload");
        this.head.addOptions([uploadFile]);

        AuthStorage.instance.subscribe(state =>
        {
            switch (state.status)
            {
                case "SignIn":
                    this.showFiles();
                    break;
                case "SignOut":
                    this.showEmptyFiles("Please sign in to see your files");
                    break;
            }
        })
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

        this.fileList.clearFileList();
        this.fileList.html.appendChild(spinner.html);

        const files = await FilesService.getFiles();

        if (!files.data)
        {
            spinner.destroy();
            this.showEmptyFiles("No files yet...");
            return;
        }

        let selectedId = "";
        const items = files.data.map(file =>
        {
            const date = new Date(file.timestamp).toString();
            const item = new WFileItem(file.id, file.name, DateFormatter.format(date));
            item.onClick = () =>
            {
                items?.forEach(i => i.html.classList.remove("active"));
                item.html.classList.add("active");
                selectedId = file.id;

                this.showFileDetails(file.id);

                FilesStorage.instance.openFile(file.id);
            }

            item.onDelete = () =>
            {
                item.destroy();

                // if deleting the selected item, then clear right
                if (item.id === selectedId) this.right.replaceChildren();

                // if no more files after deleting last file, show empty message
                if (this.fileList.html.children.length <= 0)
                    this.showEmptyFiles("You don't have any files yet");
            }

            return item;
        });

        spinner.destroy();
        this.fileList.addFileItems(items ?? []);
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

        tableDetails.addItems([ new WDetailsTableItem("File name", fileDetail.data?.name ?? "" )]);
        this.shareList.addShareItems(fileDetail.data?.users?.map(i => new WShareItem(i.name, i.email)) ?? []);

        if (!fileDetail.data?.users)
            this.showEmptyShareList("Start sharing your file...");

        const items = fileDetail.data?.users?.map((i) =>
        {
            const item = new WShareItem(i.name, i.email);

            item.onDelete = () =>
            {
                item.destroy();

                if (!fileDetail.data?.users)
                    this.showEmptyShareList("Start sharing your file...");
            }

            return item;
        })

        this.shareList.addShareItems(items ?? []);

        spinner.destroy();
        collapserDetails.appendContent(tableDetails.html);
        collapserShare.appendContent(this.shareList.html);

        this.right.appendChild(collapserDetails.html);
        this.right.appendChild(collapserShare.html);
    }
}
