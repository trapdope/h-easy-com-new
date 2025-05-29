import { ExtractPropTypes, PropType } from 'vue';
type Key = string | number;


export interface TreeOptions {
    label?: Key; // 节点标签
    key?: Key; // 节点标签
    children?: TreeNode[];
    [propsName: string]: unknown; // 其他属性
}

export interface TreeNode extends Required<TreeOptions> {
    level: number; // 节点层级
    rawNode: TreeOptions; // 原始节点数据
}

export const treeProps = {
    data: {
        default: () => [],
        type: Array as PropType<TreeOptions[]>
    },
    labelField: {
        type: String,
        default: 'label'
    },
    childrenField: {
        type: String,
        default: 'children'
    },
    keyField: {
        type: String,
        default: 'key'
    }
} as const;

export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>;
