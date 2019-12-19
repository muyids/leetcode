# 智力题

## 赛马问题

25匹马5赛道，问最少多少次能得到前3名

## 抓猫猫游戏

有五个带盖的桶排成一排，其中一个桶里有一只猫，一天只能打开一个桶，猫每天都会在相邻的桶之间跳动，问怎么能抓住猫

说明：

- 猫每天都会跳动
- 猫有上帝视角，请设计必抓方案

---

1个桶需要1步，两个桶需要两步，3个桶需要2步


![四个桶解法](https://raw.githubusercontent.com/muyids/tuchuang/master/cat-four-bucket.png)

四个桶需要五步

![五个桶解法](https://raw.githubusercontent.com/muyids/tuchuang/master/cat-five-bucket-1.png)

五个桶需要七步

拓展：

1000个桶呢？会不会抓到？最少需要多少步？

我们观察到，只要形成黄白绿相间的趋势，猫的活动空间就越来越小，最终无路可走，如下图

![无路可走的猫](https://raw.githubusercontent.com/muyids/tuchuang/master/cat-five-bucket-2.png)


答案：会的，需要1 +（N-2）* 2步
