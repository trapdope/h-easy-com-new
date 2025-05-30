import { ExtractPropTypes, PropType } from 'vue';
type Key = string | number;


export interface TreeOptions {
    label?: Key; // 节点标签
    key?: Key; // 节点标签
    children?: TreeNode[];
    [propsName: string]: unknown; // 其他属性
    isLeaf?: boolean; // 是否叶子节点
}

export interface TreeNode extends Required<TreeOptions> {
    level: number; // 节点层级
    rawNode: TreeOptions; // 原始节点数据
    parentKey?: Key;
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
    },
    defaultExpandKeys: {
        type: [String, Number, Array] as PropType<Key | Key[]>,
        default: () => []
    }
} as const;

export const treeNodeProps = {
    node: {
        type: Object as PropType<TreeNode>,
        required: true
    },
    expanded: {
        type: Boolean,
        default: false
    }

} as const

export const treeNodeEmits = {
    toggle: (node: TreeNode) => node
}
export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>;
export type TreeNodeProps = Partial<ExtractPropTypes<typeof treeNodeProps>>;
