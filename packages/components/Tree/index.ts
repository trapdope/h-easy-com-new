import _Tree from './src/Tree.vue';
import { withInstall } from '@blu3trap/utils/withInstall';
const Tree = withInstall(_Tree);
export default Tree;
export * from './src/tree';

declare module 'vue' {
    export interface GlobalComponents {
        HTree: typeof Tree;
    }
}