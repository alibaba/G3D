# BaseMesh

网格体基类，继承自 [Node](./Node)。

## 属性

| 名称             | 类型      | 描述                      |
| ---------------- | --------- | ------------------------- |
| visibility       | G3D.Scene | 是否可见，默认为 true     |
| pickable         | boolean   | 是否允许点选，默认为 true |
| renderLayerIndex | Number    | 渲染层级索引              |

## 方法

### dispose()

将网格体从场景中删除和释放。