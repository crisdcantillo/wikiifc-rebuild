import WCollapser from "../../shared/collapser";
import WDetailsTable from "../../shared/details-table";
import { WDetailsTableItemEditable } from "../../shared/details-table-item";
import WEmpty from "../../shared/empty";
import WPanelHead from "../../shared/panel-head";
import WPanelHeadOption from "../../shared/panel-head-option";
import WSpinner from "../../shared/spinner";
import Assets from "../../utils/assets";
import DateFormatter from "../../utils/date";
import { Global, GlobalEvent } from "../../utils/global";
import WCommentField from "./comment-field";
import WCommentItem from "./comment-item";
import WCommentList from "./comment-list";
import CollaborationService from "./services";
import WTopicItem from "./topic-item";
import WTopicList from "./topic-list";

export default class CollaborationModule
{
    private left: HTMLElement;
    private right: HTMLElement;

    private head: WPanelHead;
    private topicList: WTopicList;

    constructor(left: HTMLElement, right: HTMLElement)
    {
        this.left = left;
        this.right = right;

        this.head = new WPanelHead("Collaboration");
        this.topicList = new WTopicList();

        this.left.appendChild(this.head.html);
        this.left.appendChild(this.topicList.html);

        this.setHead();

        // events
        Global.listenEvent(GlobalEvent.OnLoggedIn, () => this.showEmptyTopics("Select a file to see its topics here..."));
        Global.listenEvent(GlobalEvent.OnLoggedOut, () => this.showEmptyTopics("Login to see your topics here..."));
        Global.listenEvent(GlobalEvent.OnFileOpened, () => this.showTopics(Global.getLoadedModel()));
    }

    private setHead(): void
    {
        const uploadFile = new WPanelHeadOption(Assets.topic, "Add topic");
        this.head.addOptions([uploadFile]);
    }

    public showEmptyTopics(message: string): void
    {
        const empty = new WEmpty("warning", message);
        this.topicList.html.replaceChildren();
        this.topicList.html.appendChild(empty.html);
    }

    public async showTopics(fileId: string): Promise<void>
    {
        const spinner = new WSpinner();

        this.topicList.clear();
        this.topicList.html.appendChild(spinner.html);

        const topics = await CollaborationService.getTopics(fileId);

        if (topics.items.length <= 0)
        {
            spinner.destroy();
            return this.showEmptyTopics("There are no topics to show for the selected file");
        }

        const items = topics.items?.map(i =>
        {
            const item = new WTopicItem(i.title, DateFormatter.format(i.created));
            item.onClick = () => this.showTopicDetails(i.id);

            return item;
        });

        spinner.destroy();
        this.topicList.addItems(items ?? []);
        this.left.appendChild(this.topicList.html);
    }

    public async showTopicDetails(id: string): Promise<void>
    {
        const collapserDetails = new WCollapser("Topic");
        const collapserComments = new WCollapser("Comments");

        const topicDetailsTable = new WDetailsTable();
        const topicComments = new WCommentList();
        const topicCommentField = new WCommentField();
        const spinner = new WSpinner();

        this.right.replaceChildren(spinner.html);
        const details = await CollaborationService.getTopicDetails(id);
        const comments = await CollaborationService.getTopicComments(id);

        topicDetailsTable.addItems
        ([
            new WDetailsTableItemEditable("Title", details.data?.title ?? "" ),
            new WDetailsTableItemEditable("Description", details?.data?.description ?? "" ),
            new WDetailsTableItemEditable("Priority", details?.data?.priority ?? "" ),
            new WDetailsTableItemEditable("Status", details?.data?.status ?? "" ),
            new WDetailsTableItemEditable("Due Date", DateFormatter.format(details?.data?.dueDate)),
            new WDetailsTableItemEditable("Assigned to", details?.data?.expand?.assignedTo?.email ?? "" ),
            new WDetailsTableItemEditable("Created by", details?.data?.expand?.createdBy?.email ?? "" ),
            new WDetailsTableItemEditable("Created at", DateFormatter.format(details?.data?.created)),
            new WDetailsTableItemEditable("Updated by", details?.data?.expand?.updatedBy?.email ?? "" ),
            new WDetailsTableItemEditable("Updated at", DateFormatter.format(details?.data?.updated)),
        ]);

        const commentItems = comments.items?.map(i => new WCommentItem(i.created, DateFormatter.format(i.created), i.content)) ?? [];
        topicComments.addItems(commentItems);

        spinner.destroy();
        collapserDetails.appendContent(topicDetailsTable.html);
        collapserComments.appendContent(topicComments.html);
        collapserComments.appendContent(topicCommentField.html);

        this.right.appendChild(collapserDetails.html);
        this.right.appendChild(collapserComments.html);
    }
}
