# 系统设计题


## 4S分析法

Senario, Service, Storage, Scale
场景，服务，存储，扩展

Scenario 场景

- 说人话:需要设计哪些功能，设计得多牛
- Ask / Features / QPS / DAU / Interfaces

Service 服务

- 说人话:将大系统拆分为小服务
- Split / Application / Module

Storage 存储

- 说人话:数据如何存储与访问
- Schema / Data / SQL / NoSQL / File System

Scale 升级

- 说人话:解决缺陷，处理可能遇到的问题
- Sharding / Optimize / Special Case

以设计weibo为例，4s分析法解决

### Scenario 场景

询问面试官

1. 需要设计哪些功能（也可以自己想）
2. 需要承受多大的访问量？

### Service 服务

将大系统拆分为小服务

1. Replay重放需求
2. Merge归并需求

### Storage 存储

内存
    某些数据不需要持久化，直接内存保存就可以

数据库
    存储结构化的数据
    分为 关系型数据和非关系型数据，如何做选择？

文件系统
    分布式文件系统，存储非结构化的数据，比如图片、视频等

1. 为每个Service选择存储结构
2. Schema 细化表结构


