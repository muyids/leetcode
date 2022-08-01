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
    data = {"operationName":"questionData","variables":{"titleSlug":question__title_slug},"query":"query questionData($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    questionId\n    questionFrontendId\n    categoryTitle\n    boundTopicId\n    title\n    titleSlug\n    content\n    translatedTitle\n    translatedContent\n    isPaidOnly\n    difficulty\n    likes\n    dislikes\n    isLiked\n    similarQuestions\n    contributors {\n      username\n      profileUrl\n      avatarUrl\n      __typename\n    }\n    langToValidPlayground\n    topicTags {\n      name\n      slug\n      translatedName\n      __typename\n    }\n    companyTagStats\n    codeSnippets {\n      lang\n      langSlug\n      code\n      __typename\n    }\n    stats\n    hints\n    solution {\n      id\n      canSeeDetail\n      __typename\n    }\n    status\n    sampleTestCase\n    metaData\n    judgerAvailable\n    judgeType\n    mysqlSchemas\n    enableRunCode\n    envInfo\n    book {\n      id\n      bookName\n      pressName\n      source\n      shortDescription\n      fullDescription\n      bookImgUrl\n      pressImgUrl\n      productUrl\n      __typename\n    }\n    isSubscribed\n    isDailyQuestion\n    dailyRecordStatus\n    editorType\n    ugcQuestionId\n    style\n    exampleTestcases\n    jsonExampleTestcases\n    __typename\n  }\n}\n"}
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
    res = requests.post(url='https://leetcode.cn/graphql/',data=json.dumps(data),headers=headers)
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

    def get_dir(k):
        k = int(k)
        for i in range(100):
            u = 100 * i + 1
            v = 100 * i + 100
            if k >= u and k <= v:
                return str(u) + '-' + str(v)
        return 'unknown'

    questionId = question['questionFrontendId']
    translatedTitle = question['translatedTitle'] 
    titleSlug = question['titleSlug'] 
    
    isPaidOnly = question['isPaidOnly'] 
    if isPaidOnly:
        print('会员 money dog!')
        return
    dir = config['solve_dir'] + '/' + get_dir(questionId)
    check_dir(dir)
    file_name = f'''{dir}/{questionId}.{translatedTitle}.md'''

    # 保存题解
    if os.path.exists(file_name) is False:
        title = f'''# [{questionId}.{translatedTitle}](https://leetcode.cn/problems/{titleSlug}/)\n\n'''
        content = question['translatedContent']

        solver = '''\n\n
----------

# 算法1

## (暴力枚举)  $O(n^2)$

blablabla

## 时间复杂度

## C++ 代码

```cpp

```

## 参考文献


'''
        create_and_write_file(file_name, title+content+solver)

    os.system(f'''open {file_name}''')
    # 保存Java代码模板
    java_code_loc = config['java_dir'] + '/p' + questionId
    check_dir(java_code_loc)

    for snippet in question['codeSnippets']:
        if snippet['lang'] == 'C++':
            cpp_code = snippet['code']
        elif snippet['lang'] == 'Java':
            solution_file = java_code_loc + '/Solution.java' 
            java_header = f'''package com.muyids.leetcode.p{questionId};\n\n'''
            java_code = snippet['code']
            create_and_write_file(solution_file, java_header+java_code)

            main_file = java_code_loc + '/Main.java'
            java_code = '''package com.muyids.leetcode.p%s;

public class Main {

    public static void main(String[] args) {
        Solution solution = new Solution();
        
    }
    
}
'''% (questionId)
            create_and_write_file(main_file, java_code)
            

    # topicTagsArr = question['topicTags']
    # print('topicTags:', )

    # print('Java Code:',question['translatedContent'])

    # print('questionID:',question['questionId'] )
    # print('questionFrontendId:',question['questionFrontendId'] )

    
    # print('difficulty:',question['difficulty'] )
    # print('likes:',question['likes'] )

if __name__ == '__main__':
    print('args is:', sys.argv)
    question_id = int(sys.argv[1])
    problem_status = problem_status_by_frontened_id(question_id)
    question = crawler_problem(problem_status['question__title_slug'])
    save_template(question)
    print(f'''question {question_id} created''')

 

