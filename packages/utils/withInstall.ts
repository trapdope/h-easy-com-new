import { Plugin } from "vue";
// 定义一个类型 SFCWithInstall，它扩展了 T 类型并添加了 Plugin 接口的方法
export type SFCWithInstall<T> = T & Plugin
// 定义一个函数 withInstall，它接受一个组件 com 并返回一个带有 install 方法的组件
export const withInstall = <T>(com: T) => {
    // 为组件 com 添加 install 方法，该方法用于将组件注册到 Vue 应用中
    (com as SFCWithInstall<T>).install = (app: any) => {
        // 从组件 com 中提取 name 属性
        const { name } = com as unknown as { name: string };
        // 使用 app.component 方法将组件注册到 Vue 应用中，组件名称为 name
        app.component(name, com);
    }
    // 返回带有 install 方法的组件
    return com as SFCWithInstall<T>;
}