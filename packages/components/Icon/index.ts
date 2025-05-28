import _Icon from './src/Icon.vue';
import { withInstall } from '@blu3trap/utils/withInstall';
const Icon = withInstall(_Icon);
export default Icon;
export * from './src/icon';

declare module 'vue' {
    export interface GlobalComponents {
        HIcon: typeof Icon;
    }
}