import { useState } from 'react';
import ArrowDownIcon from '@atlaskit/icon/glyph/arrow-down'
import AddIcon from '@atlaskit/icon/glyph/add'
import Breadcrumbs, { BreadcrumbsItem } from '@atlaskit/breadcrumbs';
import PageHeader from '@atlaskit/page-header';
import { useRef } from 'react';
import '@atlaskit/css-reset';
import MoreIcon from '@atlaskit/icon/glyph/more';
import { InlineEditableTextfield} from '@atlaskit/inline-edit';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import Heading from '@atlaskit/heading';
import Story16Icon from '@atlaskit/icon-object/glyph/story/16';
import Page16Icon from '@atlaskit/icon-object/glyph/page/16';
import AttachmentIcon from '@atlaskit/icon/glyph/attachment'
import Button,{ ButtonGroup }from '@atlaskit/button';
import SubtaskIcon from '@atlaskit/icon/glyph/subtask'
import { Inline,Box, Stack, xcss, Text } from '@atlaskit/primitives';
import Avatar from '@atlaskit/avatar';
import  { HelperMessage } from '@atlaskit/form';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import Lozenge from '@atlaskit/lozenge';
import Textfield from '@atlaskit/textfield';
import Comment from '@atlaskit/comment';
import {useTruncateFromMiddle} from "use-truncate-from-middle";

const breadcrumbs = (
    <Breadcrumbs>
        <BreadcrumbsItem iconBefore={<Story16Icon label="story"/>} text="&nbsp;DP-9" />
    </Breadcrumbs>
);

const barContent = (
    <Inline space="space.100">
        <Button iconBefore={<AttachmentIcon label="" />}>Attach</Button>
        <Button iconBefore={<SubtaskIcon label="" />}>Create subtask</Button>
        <DropdownMenu
            trigger={({ triggerRef, ...props }) =>
                <Button
                    {...props}
                    iconBefore={<SubtaskIcon label="" />}
                    ref={triggerRef}
                >Create subtask</Button>
            }
        >
            <DropdownItemGroup>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Share</DropdownItem>
                <DropdownItem>Move</DropdownItem>
                <DropdownItem>Clone</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
                <DropdownItem>Report</DropdownItem>
            </DropdownItemGroup>
        </DropdownMenu>
        <Button iconBefore={<SubtaskIcon label="" />} iconAfter={<ChevronDownIcon label="" />}>Create subtask</Button>
        <Button iconBefore={<MoreIcon label="More actions" />}></Button>
    </Inline>
);
const baseStyles = xcss({maxWidth: '800px'});
const attachmentStyles = xcss({
    minWidth: "10rem",
    maxWidth: "10rem",
    height: "7rem",
    fontSize: '0.7rem',
    borderRadius:"border.radius.100",
    boxShadow: 'elevation.shadow.raised',
    backgroundColor:'color.background.inverse.subtle',
    ':hover': {
        backgroundColor: 'elevation.surface.hovered',
    },
});

const LocalDatetime = (props: { datetime: Date, }) => props.datetime.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'medium' });
const LocalDate = (props: { date: Date, }) => props.date.toLocaleDateString(undefined, { dateStyle: 'medium' });

type AttachmentProps =  {
    filename: string,
    datetime: Date,
};
const filenameStyles = xcss({ fontWeight: "500"});
const Attachment = (props: AttachmentProps)  => {
    const { filename,datetime } = props;
    const textRef = useRef(null);

    const { truncatedText } = useTruncateFromMiddle({
        ref: textRef,
        originalText: filename,
        middleChars: '....',
    });

    return (<Stack xcss={attachmentStyles} alignBlock="end">
        <Box padding='space.050' backgroundColor='elevation.surface.overlay'>
            <Box ref={textRef} xcss={filenameStyles}>{truncatedText}</Box>
            <Text><LocalDatetime datetime={datetime}/></Text>
        </Box>
    </Stack>);
}

const exampleFile: AttachmentProps = {
 filename: 'Screenshot some content making it long ewfdew.png', datetime: new Date(),
}

const relatedItemStyles = xcss({
    borderRadius:"border.radius.100",
    boxShadow: 'elevation.shadow.raised',
})
const relatedItemLabelStyles = xcss({
    fontWeight:450
})
const App = () => {
    const [editValue, setEditValue] = useState('Test issue description');
    return (
    <Box padding="space.400" xcss={baseStyles}>
        <Stack space="space.600">
            <Box>
                    <PageHeader
                        breadcrumbs={breadcrumbs}
                        bottomBar={barContent}
                    >
                        Test issue
                    </PageHeader>

            <Heading as="h5">Description</Heading>
            <InlineEditableTextfield
                defaultValue={editValue}
                onConfirm={setEditValue}
                placeholder="Click to edit the description"
                isCompact
            />
            </Box>
            <Box>
                <Heading as="h5">Confluence pages</Heading>
                <Stack space="space.200">
                    <HelperMessage>
                        mentioned on
                    </HelperMessage>
                    <Box paddingBlock="space.050" paddingInlineStart='space.100' paddingInlineEnd='space.500' xcss={relatedItemStyles}>
                        <Inline alignBlock="center" spread="space-between">
                            <Inline alignBlock="center" space="space.100" xcss={relatedItemLabelStyles}>
                                <Page16Icon label="page"/>
                                <Text variant="ui.small">Related confluence document</Text>
                            </Inline>
                            <Inline alignBlock="center"  space="space.100">
                                <Text variant='body.small'>Update on <LocalDate date={new Date}/></Text>
                                <Avatar size="small" />
                            </Inline>
                        </Inline>
                    </Box>
                </Stack>
            </Box>
            <Box>
                <Inline alignBlock="center" spread="space-between">
                <Heading as="h5">Attachments (5)</Heading>
                    <ButtonGroup appearance="subtle">
                        <Button iconBefore={<MoreIcon  size="small" label="More" />}/>
                        <Button iconBefore={<AddIcon size="small" label="Add" />}/>
                    </ButtonGroup>
                    </Inline>
                <Inline shouldWrap={false} space="space.100">
                    <Attachment {...exampleFile}/>
                    <Attachment {...exampleFile}/>
                    <Attachment {...exampleFile}/>
                    <Attachment {...exampleFile}/>
                    <Attachment {...exampleFile}/>
                </Inline>
            </Box>
            <Box>
                <Heading as="h5">Activity</Heading>
                <Inline alignBlock="center" spread="space-between">
                <Inline space="space.100" alignBlock="center" alignInline="center">
                    Show:
                    <Lozenge>All</Lozenge>
                    <Lozenge isBold>Comments</Lozenge>
                    <Lozenge>History</Lozenge>
                    <Lozenge>Work log</Lozenge>
                </Inline>
                <Inline>
                    <Button appearance="subtle" iconAfter={<ArrowDownIcon label="" />}>Newest first</Button>
                </Inline>
                </Inline>

            <Comment
                avatar={<Avatar name="Scott Farquhar" />}
                content={<Textfield placeholder="Add a comment..." />}
                afterContent={<HelperMessage>
                    Prop tip: press M to comment
                </HelperMessage>}
            />
            </Box>
    </Stack>
</Box>);}

export default App;