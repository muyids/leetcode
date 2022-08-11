# -*- coding: utf-8 -*-

import requests
import json
import os
import sys

LEETCODE_HOME = os.environ.get('LEETCODE_HOME')
LEETCODE_CODE_HOME = os.environ.get('LEETCODE_CODE_HOME')


def get_slug_by_frontened_id(fronted_id):
    fronted_id = str(fronted_id)
    f = open(LEETCODE_HOME + '/tmp/problem.json')
    problem = json.load(f)

    pairs = problem['stat_status_pairs']
    for pair in pairs:
        stat = pair['stat']
        num = str(stat['frontend_question_id'])
        if num == fronted_id:
            return stat['question__title_slug']
    return ''


def crawler_problem(question__title_slug):
    data = {
        'operationName': 'questionData',
        'variables': {'titleSlug': question__title_slug},
        'query': 'query questionData($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    questionId\n    questionFrontendId\n    categoryTitle\n    boundTopicId\n    title\n    titleSlug\n    content\n    translatedTitle\n    translatedContent\n    isPaidOnly\n    difficulty\n    likes\n    dislikes\n    isLiked\n    similarQuestions\n    contributors {\n      username\n      profileUrl\n      avatarUrl\n      __typename\n    }\n    langToValidPlayground\n    topicTags {\n      name\n      slug\n      translatedName\n      __typename\n    }\n    companyTagStats\n    codeSnippets {\n      lang\n      langSlug\n      code\n      __typename\n    }\n    stats\n    hints\n    solution {\n      id\n      canSeeDetail\n      __typename\n    }\n    status\n    sampleTestCase\n    metaData\n    judgerAvailable\n    judgeType\n    mysqlSchemas\n    enableRunCode\n    envInfo\n    book {\n      id\n      bookName\n      pressName\n      source\n      shortDescription\n      fullDescription\n      bookImgUrl\n      pressImgUrl\n      productUrl\n      __typename\n    }\n    isSubscribed\n    isDailyQuestion\n    dailyRecordStatus\n    editorType\n    ugcQuestionId\n    style\n    exampleTestcases\n    jsonExampleTestcases\n    __typename\n  }\n}\n',
    }
    headers = {
        'accept': '*/*',
        'accept-language': 'zh-CN',
        'content-type': 'application/json',
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-csrftoken': 'AoZmaswgG6XancLZzI2rWcxlqQ0gwT8hb8hDldfM38bAGvMNmOySa6qNCpuefSxu',
        'x-definition-name': 'question',
        'x-operation-name': 'questionData',
        'x-timezone': 'Asia/Shanghai',
    }
    res = requests.post(
        url='https://leetcode.cn/graphql/', data=json.dumps(data), headers=headers
    )
    body = json.loads(res.text)
    return body['data']['question']


def load_code(question):
    code_path = f"""{LEETCODE_CODE_HOME}/src/main/java/com/muyids/lc/p{question['questionFrontendId']}/Solution.java"""
    f = open(code_path)
    line = f.readline()
    res = ''
    while line:
        if line.find('package') == -1:
            res += line
        line = f.readline()
    f.close()
    return res


def judge(question, code):
    questionId = question['questionId']
    slug = question['titleSlug']
    print(questionId, slug)
    data = {
        'question_id': questionId,
        'lang': 'java',
        'typed_code': code,
        'test_mode': 'false',
        'test_judger': '',
        'questionSlug': slug,
    }
    headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'content-type': 'application/json',
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-csrftoken': 'AoZmaswgG6XancLZzI2rWcxlqQ0gwT8hb8hDldfM38bAGvMNmOySa6qNCpuefSxu',
    }
    url = f"""https://leetcode.cn/problems/{slug}/submit/"""
    res = requests.post(url=url, data=json.dumps(data), headers=headers)
    print(res.text)
    body = json.loads(res.text)
    return body['submission_id']


def submit(question):
    print('submit ', question['questionFrontendId'])
    code = load_code(question)
    submission_id = judge(question, code)
    print('submission_id', submission_id)


if __name__ == '__main__':
    question_id = int(sys.argv[1])  # 题目编号

    slug = get_slug_by_frontened_id(question_id)
    question_file = f"""{LEETCODE_HOME}/tmp/questions/{slug}.json"""
    if os.path.exists(question_file):
        question = json.load(open(question_file))
    else:
        question = crawler_problem(slug)

    submit(question)
