# -*- coding: utf-8 -*-

import requests
import json
import os
import sys

config = {
    'solve_dir': '/Users/aibee/Workspace/muyids/leetcode/algorithms',
    # 'solve_dir': '/Users/aibee/Workspace/muyids/leetcode/src/main/java/com/muyids/leetcode',
    'java_dir': '/Users/aibee/Workspace/muyids/leetcode/src/main/java/com/muyids/leetcode'
}


def problem_status_by_frontened_id(fronted_id):
    fronted_id = str(fronted_id)
    f = open('./tmp/problem.json')
    problem = json.load(f)

    pairs = problem['stat_status_pairs']
    for pair in pairs:
        stat = pair['stat']
        num = str(stat['frontend_question_id'])
        if num == fronted_id:
            return stat
    return {}


def crawler_problem(question__title_slug):
    data = {"operationName": "questionData", "variables": {"titleSlug": question__title_slug},
            "query": "query questionData($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    questionId\n    questionFrontendId\n    categoryTitle\n    boundTopicId\n    title\n    titleSlug\n    content\n    translatedTitle\n    translatedContent\n    isPaidOnly\n    difficulty\n    likes\n    dislikes\n    isLiked\n    similarQuestions\n    contributors {\n      username\n      profileUrl\n      avatarUrl\n      __typename\n    }\n    langToValidPlayground\n    topicTags {\n      name\n      slug\n      translatedName\n      __typename\n    }\n    companyTagStats\n    codeSnippets {\n      lang\n      langSlug\n      code\n      __typename\n    }\n    stats\n    hints\n    solution {\n      id\n      canSeeDetail\n      __typename\n    }\n    status\n    sampleTestCase\n    metaData\n    judgerAvailable\n    judgeType\n    mysqlSchemas\n    enableRunCode\n    envInfo\n    book {\n      id\n      bookName\n      pressName\n      source\n      shortDescription\n      fullDescription\n      bookImgUrl\n      pressImgUrl\n      productUrl\n      __typename\n    }\n    isSubscribed\n    isDailyQuestion\n    dailyRecordStatus\n    editorType\n    ugcQuestionId\n    style\n    exampleTestcases\n    jsonExampleTestcases\n    __typename\n  }\n}\n"}
    headers = {
        "accept": "*/*",
        "accept-language": "zh-CN",
        "content-type": "application/json",
        "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-csrftoken": "AoZmaswgG6XancLZzI2rWcxlqQ0gwT8hb8hDldfM38bAGvMNmOySa6qNCpuefSxu",
        "x-definition-name": "question",
        "x-operation-name": "questionData",
        "x-timezone": "Asia/Shanghai"
    }
    res = requests.post(url='https://leetcode.cn/graphql/', data=json.dumps(data), headers=headers)
    body = json.loads(res.text)
    return body['data']['question']


def check_dir(dir):
    if os.path.exists(dir) is False:
        print('create folder ' + dir)
        os.makedirs(dir)


def create_and_write_file(file_name, content):
    file = open(file_name, 'w', encoding='utf-8')
    file.write(content)
    file.close()


def save_template(question):
    if question['isPaidOnly']:
        print('paid dog!')
        return

    questionId = question['questionFrontendId']
    translatedTitle = question['translatedTitle']

    def get_dir(k):
        k = int(k)
        for i in range(100):
            u = 100 * i + 1
            v = 100 * i + 100
            if k >= u and k <= v:
                return str(u) + '-' + str(v)
        return 'unknown'

    def save_solver(question):

        def get_tags():
            topicTagsArr = question['topicTags']
            tags = []
            for topic_tags in topicTagsArr:
                tags.append(topic_tags['translatedName'])
            return tags

        titleSlug = question['titleSlug']
        dir = config['solve_dir'] + '/' + get_dir(questionId)
        check_dir(dir)
        file_name = f'''{dir}/{questionId}.{translatedTitle}.md'''

        # 保存题解
        if True or os.path.exists(file_name) is False:
            title = f'''# [{questionId}.{translatedTitle}](https://leetcode.cn/problems/{titleSlug}/)\n\n'''

            content = question['translatedContent']
            tags = f'''\n\n<details>
<summary>标签：</summary>
{get_tags()}
</details>\n'''
            tail = f'''\n<details>
<summary>难度：{question['difficulty']}</summary>
喜欢：{question['likes']}
</details>\n'''
            solver = '''\n
----------

# 算法1

## (暴力枚举)  $O(n^2)$

blablabla

## 时间复杂度

## 代码实现

```java []

```

```cpp []

```

## 参考文献


'''

            create_and_write_file(file_name, title + content + tags + tail + solver)

        os.system(f'''open {file_name}''')  # 系统调用，打开题解文件

    def save_java_code(question):

        def line_is_array(line):
            letter = line.find('[')
            return letter == 0

        def line_is_string(line):
            letter = line.find('"')
            return letter == 0

        def test_case_formatter(case_str):
            res = "\n"
            for x, line in enumerate(case_str.splitlines()):
                if line_is_array(line):
                    line = line.replace('[', '{').replace(']', '}')
                    line = f'''\t\tint []{chr(ord('a') + x)} = {line};\n'''
                elif line_is_string(line):
                    line = f'''\t\tString {chr(ord('a') + x)} = {line};\n'''
                else:
                    line = f'''\t\tint {chr(ord('a') + x)} = {line};\n'''
                res += line
            return res

        # 保存Java代码模板
        java_code_loc = config['java_dir'] + '/p' + questionId
        check_dir(java_code_loc)

        for snippet in question['codeSnippets']:
            if snippet['lang'] != 'Java':
                continue
            solution_file = java_code_loc + '/Solution.java'
            java_header = f'''package com.muyids.leetcode.p{questionId};\n\n'''
            java_code = snippet['code']
            create_and_write_file(solution_file, java_header + java_code)
            os.system(f'''open {solution_file}''')  # 系统调用，打开题解文件

            main_file = java_code_loc + '/Main.java'
            test_case = test_case_formatter(question['sampleTestCase'])
            java_code = '''package com.muyids.leetcode.p%s;

public class Main {

    public static void main(String[] args) {
        Solution solution = new Solution();
        %s
    }

}
''' % (questionId, test_case)
            create_and_write_file(main_file, java_code)

    save_solver(question)
    save_java_code(question)

    # print('Java Code:',question['translatedContent'])


if __name__ == '__main__':
    question_id = int(sys.argv[1])

    problem_status = problem_status_by_frontened_id(question_id)
    question = crawler_problem(problem_status['question__title_slug'])
    save_template(question)
    print(f'''question {question_id} created''')
