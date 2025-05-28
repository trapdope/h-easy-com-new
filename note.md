# 基于monorepo组件库开发

项目基础架构及monorepo配置参考:

> https://github.com/trapdope/learning-monorepo/blob/main/note.md

### 一些零散的知识点

#### vue-plugin 插件相关参考(vue使用组件或插件相关知识)

> https://cn.vuejs.org/guide/reusability/plugins

#### bem规范

**BEM 规范**是一种流行的**前端开发方法论**，全称为 **Block（块）- Element（元素）- Modifier（修饰符）**。它由 Yandex 团队提出，旨在解决大型项目中 CSS 样式难以维护、组件复用性差的问题，通过**结构化命名约定**和**分层设计**，让代码更清晰、可扩展。

##### **核心概念：Block、Element、Modifier**

BEM 将界面分解为三个层次，通过独特的命名规则连接各部分：

| **概念**               | **定义**                                                     | **命名规则**                                    | **示例**                                          |
| ---------------------- | ------------------------------------------------------------ | ----------------------------------------------- | ------------------------------------------------- |
| **Block**（块）        | 独立的功能模块，具有完整的语义和功能，可独立存在（如按钮、导航栏、卡片）。 | `block`                                         | `<button class="button">按钮</button>`            |
| **Element**（元素）    | 块内的子元素，不能脱离块单独存在（如按钮的图标、导航栏的菜单项）。 | `block__element`                                | `<span class="button__icon">图标</span>`          |
| **Modifier**（修饰符） | 用于定义块或元素的**状态或样式变体**（如颜色、尺寸、禁用状态）。 | `block--modifier` 或 `block__element--modifier` | `<button class="button--primary">主按钮</button>` |

##### **核心原则**

1. **独立性**
   - 块之间相互独立，通过类名命名隔离样式，避免选择器嵌套过深导致的样式污染。
   - 示例：不使用 `nav .item` 这样的后代选择器，而是为每个元素定义独立类名（如 `nav__item`）。
2. **命名约定**
   - 使用 **双下划线** `__` 分隔块和元素（如 `block__element`）。
   - 使用 **双短横线** `--` 分隔块 / 元素和修饰符（如 `block--modifier` 或 `block__element--modifier`）。
   - 命名需语义化，避免使用无意义的类名（如 `btn` 改为 `button`，`item` 改为 `menu__item`）。
3. **样式复用与扩展**
   - 修饰符可灵活组合，同一元素通过不同修饰符实现多种状态（如 `button--primary` 和 `button--disabled` 可同时存在）。
   - 块可作为其他块的元素（如 `header__nav` 中的 `nav` 本身也是一个块），形成嵌套结构。

##### 相关使用函数

```ts
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
    const b = (blockSuffix?: string) => blockSuffix ? _bem(prefixName, blockSuffix, '', '') : ''; 
    // 仅生成代码块类名
    const e = (element?: string) => element ? _bem(prefixName, '', element, '') : ''; 
    // 仅生成元素类名
    const m = (modifier?: string) => modifier ? _bem(prefixName, '', '', modifier) : ''; 
    // 仅生成装饰器类名
    const be = (blockSuffix?: string, element?: string) => blockSuffix && element ? _bem(prefixName, blockSuffix, element, '') : ''; 
    // 生成代码块和元素类名
    const bm = (blockSuffix?: string, modifier?: string) => blockSuffix && modifier ? _bem(prefixName, blockSuffix, '', modifier) : ''; 
    // 生成代码块和装饰器类名
    const em = (element?: string, modifier?: string) => element && modifier ? _bem(prefixName, '', element, modifier) : ''; 
    // 生成元素和装饰器类名
    const bem = (blockSuffix?: string, element?: string, modifier?: string) => blockSuffix && element && modifier ? _bem(prefixName, blockSuffix, element, modifier) : ''; 
    // 生成代码块、元素和装饰器类名
    const is = (state: string) => state ? `is-${state}` : ''; 
    // 生成状态类名
    return { b, e, m, be, bm, em, bem, is };
}

export const createNamespace = (name: string) => {
    const prefixName = `h-${name}`; // 前缀名
    return createBEM(prefixName);
}
```

#### export 及 export default混用

在 TypeScript 里，`export default`和`export * from 'xxx'`这两种语法能够在同一个文件里搭配使用，其目的是对模块的接口加以整合与简化。下面为你详细介绍它们的意义和用法：

##### 1. **`export default`的作用**

这一语法的用途是从模块里导出唯一的默认值。这个默认值可以是类、函数、对象或者其他类型。在导入时，不需要使用花括号，而且可以自定义导入名称。

```typescript
// utils.ts
export default function add(a: number, b: number) {
  return a + b;
}
```

导入时的写法如下：

```typescript
import sum from './utils'; // 可以随意命名
console.log(sum(1, 2)); // 输出3
```

##### 2. **`export \* from 'xxx'`的作用**

该语法的功能是将另一个模块的所有导出内容重新导出，不过不会在当前模块引入这些导出内容，也不会影响默认导出。它的主要作用是对模块结构进行扁平化处理。

```typescript
// math/index.ts
export * from './add'; // 重新导出add模块的所有内容
export * from './subtract'; // 重新导出subtract模块的所有内容
```

导入时可以这样操作：

```typescript
import { add, subtract } from './math'; // 从math目录统一导入
```

##### 3. **二者结合使用的意义与场景**

二者结合使用，能够让模块既拥有默认导出，又能重新导出其他模块的内容，从而实现模块接口的整合。这种方式常用于以下场景：

###### 场景一：工具库的整合

```typescript
// utils/index.ts
export default {
  log: (message: string) => console.log(message),
  error: (message: string) => console.error(message),
};

// 重新导出其他工具模块
export * from './string-utils';
export * from './number-utils';
```

导入时的示例：

```typescript
import logger, { capitalize, clamp } from './utils';
logger.log('Hello'); // 使用默认导出
capitalize('test'); // 使用重新导出的工具函数
```

###### 场景二：组件库的封装

```typescript
// components/index.ts
import Button from './Button';
export default Button; // 默认导出主组件

// 重新导出其他组件
export * from './Input';
export * from './Select';
```

导入时的示例：

```typescript
import Button, { Input, Select } from './components';
```

##### 4. **使用时的注意要点**

- **默认导出与命名导出的差异**：默认导出在每个模块中只能有一个，而命名导出可以有多个。
- **避免命名冲突**：重新导出的内容如果存在命名冲突，需要使用`export { add as addNumber } from './add'`这种方式进行重命名。
- **循环导入问题**：在重新导出时要避免形成循环导入的情况。

##### 总结

通过将`export default`和`export * from 'xxx'`结合使用，可以打造出结构清晰的模块接口。这样一来，用户既能通过默认导出获取主要功能，又能按需导入其他辅助功能，提升了模块的易用性。