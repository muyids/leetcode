# 获取题目描述文件
from selenium import webdriver
from PIL import Image

driver = webdriver.Chrome()
driver.get('https://leetcode-cn.com/classic/problems/two-sum/description/')

element = driver.find_element_by_class_name("question-description__3U1T")

location = element.location
size = element.size

driver.save_screenshot("shot.png")

x = location['x']
y = location['y']
w = size['width']
h = size['height']
width = x + w
height = y + h

im = Image.open('shot.png')
im = im.crop((int(x), int(y), int(width), int(height)))
im.save('image.png')
