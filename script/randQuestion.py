#!/usr/bin/python
# -*- coding: UTF-8 -*-

# 每日三题
import requests
import hashlib
import json

def getData():
    url = "http://api.k780.com/?app=finance.rate&scur=USD&tcur=CNY&appkey=49208&sign=2f5dd3710fdcfb0c255635c2f5bdb315"
    r = requests.get(url)
    data = r.json()['result']
    return data


def getMD5Str(data):
    return hashlib.md5(data.encode(encoding='UTF-8')).hexdigest()[0:16]


def getHexStrMode(hex_str, mode_num):
    str_len = len(hex_str)
    result_mod = 0
    for idx, ch in enumerate(hex_str):
        result_mod = (result_mod*16 + int(ch, 16)) % mode_num

    return result_mod


if __name__ == '__main__':

    data = getData()  # 人民币对美元汇率
    print "在岸人民币汇率", data['update'], "收盘价:", data['rate']
    print "根据汇率计算得今日打卡题目"
    rate = data['rate']
    for i in range(1, 4):  # 随机三道题目
        rate = getMD5Str(rate)
        questionNum = getHexStrMode(rate, 1326)
        print "第", i, "题：", questionNum
