import WModule from "../../core/module";
import CollaborationService from "../../services/collaboration";
import WCollapser from "../../shared/collapser";
import WDetailsTable from "../../shared/details-table";
import { WDetailsTableItemEditable } from "../../shared/details-table-item";
import WEmpty from "../../shared/empty";
import WPanelHead from "../../shared/panel-head";
import WPanelHeadOption from "../../shared/panel-head-option";
import WSpinner from "../../shared/spinner";
import Assets from "../../core/assets";
import DateFormatter from "../../utils/date";
import WCommentField from "./comment-field";
import WCommentItem from "./comment-item";
import WCommentList from "./comment-list";
import WTopicItem from "./topic-item";
import WTopicList from "./topic-list";
import { AuthStorage } from "../../storages/auth-storage";
import { FilesStorage } from "../../storages/files-storage";

export default class CollaborationModule extends WModule
{
    private head: WPanelHead;
    private topicList: WTopicList;
    private fakeProjectId: string = "fakeProjectId" //TODO: replace this by a real projectId

    constructor(left: HTMLElement, center: HTMLElement, right: HTMLElement)
    {
        super(left, center, right);
        this.head = new WPanelHead("Collaboration");
        this.topicList = new WTopicList();

        this.left.appendChild(this.head.html);
        this.left.appendChild(this.topicList.html);

        this.setHead();

        AuthStorage.instance.subscribe(state =>
        {
            switch (state.status)
            {
                case "SignOut":
                    this.showEmptyTopics("Please sign in to see your topics here");
                    break;
                case "SignIn":
                    this.showEmptyTopics("Please open a file to see its topics here");
                    break;
            }
        });

        FilesStorage.instance.subscribe(state =>
        {
            switch (state.status)
            {
                case "NotOpened":
                    this.showEmptyTopics("Please open a file to see its topics here")
                    break;
                case "Opened":
                    this.showTopics();
                    break;
            }
        })
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

    public async showTopics(): Promise<void>
    {
        const spinner = new WSpinner();
        spinner.showInsideOf(this.topicList.html);

        const topics = await CollaborationService.getTopics(this.fakeProjectId);
        spinner.destroy();

        if (!topics.data) return this.showEmptyTopics("There are no topics to show for the selected file");

        let selectedId = "";
        const items = topics.data.map(topic =>
        {
            const item = new WTopicItem(topic.guid, topic.title, DateFormatter.format(topic.creation_date));
            item.onClick = async () =>
            {
                items?.forEach(i => i.html.classList.remove("active"));
                item.html.classList.add("active");
                selectedId = topic.guid;

                this.right.replaceChildren();

                const spinner = new WSpinner();
                spinner.showFloatingInsideOf(this.right);

                await this.showTopicDetails(topic.guid);
                await this.showTopicComments(topic.guid);

                spinner.destroy();
            }

            item.onDelete = () =>
            {
                item.destroy();

                // if deleting the selected item, then clear right
                if (item.id === selectedId) this.right.replaceChildren();

                // if no more files after deleting last file, show empty message
                if (this.topicList.html.children.length <= 0)
                    this.showEmptyTopics("You don't have any topics yet");
            }

            return item;
        });

        spinner.destroy();
        this.topicList.addTopicItems(items ?? []);
        this.left.appendChild(this.topicList.html);
    }

    public async showTopicDetails(id: string): Promise<void>
    {
        const collapser = new WCollapser("Topic");
        const table = new WDetailsTable();

        this.right.appendChild(collapser.html);

        const details = await CollaborationService.getTopicDetails(this.fakeProjectId, id);

        if (!details.data)
        {
            const empty = new WEmpty("warning", "We couldn't load the details of your file, please try again later");
            collapser.appendContent(empty.html);
            return;
        }

        table.addItems
        ([
            new WDetailsTableItemEditable("Title", details.data.title ?? "" ),
            new WDetailsTableItemEditable("Description", details.data.description ?? "" ),
            new WDetailsTableItemEditable("Priority", details.data.priority ?? "" ),
            new WDetailsTableItemEditable("Status", details.data.topic_status ?? "" ),
            new WDetailsTableItemEditable("Due Date", DateFormatter.format(details.data.due_date)),
            new WDetailsTableItemEditable("Assigned to", details.data.assigned_to ?? "" ),
            new WDetailsTableItemEditable("Created by", details.data.creation_author ?? "" ),
            new WDetailsTableItemEditable("Created at", DateFormatter.format(details.data.creation_date)),
            new WDetailsTableItemEditable("Updated by", details.data.modified_author ?? "" ),
            new WDetailsTableItemEditable("Updated at", DateFormatter.format(details.data.modified_date ?? "")),
        ]);

        collapser.appendContent(table.html);
    }
    
    public async showTopicComments(id: string): Promise<void>
    {
        const collapser = new WCollapser("Comments");
        const commentList = new WCommentList();
        const commentAdder = new WCommentField();

        this.right.appendChild(collapser.html);

        const comments = await CollaborationService.getTopicComments(this.fakeProjectId, id);

        if (!comments.data)
        {
            const empty = new WEmpty("warning", "We couldn't load the comments of this file, please try again later");
            collapser.appendContent(empty.html);
            return;
        }

        const commentItems = comments.data?.map(i => new WCommentItem(i.created, DateFormatter.format(i.created), i.content)) ?? [];
        commentList.addCommentItems(commentItems);
        
        collapser.appendContent(commentList.html);
        collapser.appendContent(commentAdder.html);
    }
}
