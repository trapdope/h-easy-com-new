// 生成bem命名空间的类名
// block 代码块
// element 元素
// modifier 装饰器
// 例如 h-button是基础的按钮
// h-button__element 是按钮内部的元素
// h-button--disabled 是按钮的装饰器
// is-checked is-enabled 是按钮的状态

const _bem = (prefixName: string, blockSuffix?: string, element?: string, modifier?: string) => {
    if (blockSuffix) {
        prefixName += `-${blockSuffix}`; // 添加代码块后缀
    }
    if (element) {
        prefixName += `__${element}`; // 添加元素
    }
    if (modifier) {
        prefixName += `--${modifier}`; // 添加装饰器
    }
    return prefixName;
}
const createBEM = (prefixName: string) => {
    const b = (blockSuffix?: string) => blockSuffix ? _bem(prefixName, blockSuffix, '', '') : ''; // 仅生成代码块类名
    const e = (element?: string) => element ? _bem(prefixName, '', element, '') : ''; // 仅生成元素类名
    const m = (modifier?: string) => modifier ? _bem(prefixName, '', '', modifier) : ''; // 仅生成装饰器类名
    const be = (blockSuffix?: string, element?: string) => blockSuffix && element ? _bem(prefixName, blockSuffix, element, '') : ''; // 生成代码块和元素类名
    const bm = (blockSuffix?: string, modifier?: string) => blockSuffix && modifier ? _bem(prefixName, blockSuffix, '', modifier) : ''; // 生成代码块和装饰器类名
    const em = (element?: string, modifier?: string) => element && modifier ? _bem(prefixName, '', element, modifier) : ''; // 生成元素和装饰器类名
    const bem = (blockSuffix?: string, element?: string, modifier?: string) => blockSuffix && element && modifier ? _bem(prefixName, blockSuffix, element, modifier) : ''; // 生成代码块、元素和装饰器类名
    const is = (state: string) => state ? `is-${state}` : ''; // 生成状态类名
    return { b, e, m, be, bm, em, bem, is };
}

export const createNamespace = (name: string) => {
    const prefixName = `h-${name}`; // 前缀名
    return createBEM(prefixName);
}