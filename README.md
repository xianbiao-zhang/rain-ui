# raind 组件库 开发指南

## 介绍

组件库支持紧凑主题和深色主题，开发组件的时候应考虑到这两个配置，使用 `useContext` 获取到 `configProvider` 的`{compact}` 然后进行适配，紧凑主题的具体尺寸可以自行调整，比例合适，舒适即可，当然，也可以参考其他组件库。 暗色主题的支持需要再组件开发时采用项目内置的 less 变量`src/styles/variables/`，在切换主题的时候会 rain-ui 自动计算颜色，达到视觉协调的目的。将仅 demo 用到的包安装到开发依赖，
