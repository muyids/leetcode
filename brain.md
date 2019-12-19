# 智力题

## 抓猫猫游戏

有五个带盖的桶排成一排，其中一个桶里有一只猫，一天只能打开一个桶，猫每天都会在相邻的桶之间跳动，问怎么能抓住猫

说明：

- 猫每天都会跳动
- 猫有上帝视角，请设计必抓方案

---

分析：

1个桶时需要1步，两个桶时需要两步，3个桶时需要2步

如果是4个桶，猫跳来跳去，看似很难抓到，我们用图标分析

![四个桶解法](https://raw.githubusercontent.com/muyids/tuchuang/master/cat-four-bucket.png)

如上图，我们看到四个桶需要五步

那么同样的，五个桶情况复杂了很多，但是经过我们不断推导，发现五个桶需要七步，图解如下：

![五个桶解法](https://raw.githubusercontent.com/muyids/tuchuang/master/cat-five-bucket-1.png)

拓展：

1000个桶呢？会不会抓到？最少需要多少步？

我们观察到，只要形成黄白绿相间的趋势，猫的活动空间就越来越小，最终无路可走，如下图

![无路可走的猫](https://raw.githubusercontent.com/muyids/tuchuang/master/cat-five-bucket-2.png)


答案：会的，需要1 +（N-2）* 2步
