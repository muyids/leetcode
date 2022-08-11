# -*- coding: utf-8 -*-

from time import sleep
import requests
import json
import os
import sys
import re
from urllib.request import quote, unquote


open_code_flag = True
open_solver_flag = True

CODE_TYPE = (
    'java'
    if os.environ.get('LEETCODE_CODE_TYPE') is None
    else os.environ.get('LEETCODE_CODE_TYPE')
)
LEETCODE_HOME = os.environ.get('LEETCODE_HOME')
CPP_CODE_PROJECT = os.environ.get('LEETCODE_CPP_HOME')
JAVA_CODE_PROJECT = os.environ.get('LEETCODE_JAVA_HOME')

config = {
    'solve_dir': LEETCODE_HOME + '/algorithms',
    'java_dir': JAVA_CODE_PROJECT + '/src/main/java',
    'cpp_dir': CPP_CODE_PROJECT,
}


def get_dir(question_id):
    if question_id.isdigit():
        k = int(question_id)
        for i in range(100):
            u = 100 * i + 1
            v = 100 * i + 100
            if k >= u and k <= v:
                return str(u) + '-' + str(v)
    elif question_id.startswith('剑指 Offer II'):
        return '剑指 Offer II'
    elif question_id.startswith('剑指 Offer'):
        return '剑指 Offer'
    return 'unknown'


def print_question_url(question):
    questionId = question['questionFrontendId']
    translatedTitle = question['translatedTitle']
    titleSlug = question['titleSlug']
    title = f"""\n原题链接🔗 [{questionId}.{translatedTitle}](https://leetcode.cn/problems/{titleSlug}/)\n\n"""
    print(title)

    dir = get_dir(questionId)

    remote_url = quote(
        f"""https://github.com/muyids/leetcode/blob/master/algorithms/{dir}/{questionId}.{translatedTitle}.md""",
        safe=';/?:@&=+$,',
        encoding='utf-8',
    )
    remote_solver_url = f"""\n题解链接🔗 [{questionId}.{translatedTitle}]({remote_url})"""
    print(remote_solver_url)


def content_in_file(file_name, content):
    if os.path.exists(file_name) is False:
        return False
    with open(file_name) as f:
        s = f.read()
    return content in s


def open_solution(file_name):
    os.system(f"""open {file_name}""")


class reUnit:
    """
    通过正则表达式获取指定字符串值方法，如果结果不唯一，则返回多个
    """

    def reUnit(anyStr, leftBoundaryStr, rigjtBoundaryStr):
        """
        :param str: 完整的字符串str
        :param leftBoundaryStr: 左边界str
        :param rigjtBoundaryStr: 右边界str
        :return:返回正则取值结果list
        """
        return re.findall('{}(.+?){}'.format(leftBoundaryStr, rigjtBoundaryStr), anyStr)


def parse_java_method(solution_code_java):
    str = solution_code_java.replace('\n', ' ')
    simple = reUnit.reUnit(str, 'class Solution {     ', '\) {')
    print(22222, simple)
    if len(simple) == 0:
        return simple
    arr = re.split(' |, |\\(|& ', simple[0])
    print(33333, arr)
    return arr


def parse_cpp_method(solution_code_cpp):
    str = solution_code_cpp.replace('\n', ' ')
    simple = reUnit.reUnit(str, 'class Solution { public:     ', '\) {')
    if len(simple) == 0:
        return simple
    arr = re.split(' |, |\\(|& ', simple[0])
    return arr


def case_input_formatter(line):
    line = line.replace('[', '{').replace(']', '}')
    line = line.replace('\r', '')
    return line


def case_is_array(line):
    letter = line.find('[')
    return letter == 0


def case_is_string(line):
    letter = line.find('"')
    return letter == 0


def get_slug_by_frontened_id(fronted_id):
    fronted_id = str(fronted_id)
    f = open(LEETCODE_HOME + '/tmp/problem.json')
    problem = json.load(f)

    pairs = problem['stat_status_pairs']
    for pair in pairs:
        stat = pair['stat']
        num = str(stat['frontend_question_id'])
        if num == fronted_id:
            return pair
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


def check_dir(dir):
    if os.path.exists(dir) is False:
        print('create folder ' + dir)
        os.makedirs(dir)


def check_file(file_path):
    return os.path.exists(file_path)


def create_and_write_file(file_name, content):
    print('create file', file_name)
    file = open(file_name, 'w', encoding='utf-8')
    file.write(content)
    file.close()


def save_question(question):
    if question['isPaidOnly']:
        print('会员题!')
        return

    questionId = question['questionFrontendId']
    translatedTitle = question['translatedTitle']

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
        file_name = f"""{dir}/{questionId}.{translatedTitle}.md"""

        # 保存题解
        if os.path.exists(file_name) is False:
            title = f"""# [{questionId}.{translatedTitle}](https://leetcode.cn/problems/{titleSlug}/)\n\n"""

            content = question['translatedContent']
            tags = f"""\n\n<details>
<summary>标签：</summary>
{get_tags()}
</details>\n"""
            tail = f"""\n<details>
<summary>难度：{question['difficulty']}</summary>
喜欢：{question['likes']}
</details>\n"""
            solver = """\n
----------

# 算法1

## 算法思路

blablabla

## 复杂度分析

时间复杂度：$O(n^2)$

空间复杂度：$O(1)$

## 代码实现

```cpp []

```

```java []

```

## 参考文献


"""

            create_and_write_file(file_name, title + content + tags + tail + solver)
        if open_solver_flag:
            file_name = file_name.replace(' ', '\ ')
            cmd = f"""open {file_name}"""
            print(cmd)
            os.system(cmd)  # 系统调用，打开题解文件

    def save_java_code(question):
        if CODE_TYPE != 'java' or open_code_flag is False:
            return

        def format_print_code(method_res_type):
            if method_res_type == 'int' or method_res_type == 'String':
                return '\t\tSystem.out.println(res);'
            if method_res_type == 'int[]':
                return """
    for (int i = 0; i < res.length; i++) {
        System.out.printf("\t%d", res[i]);
    }
    System.out.println();
"""
            if method_res_type == 'int[][]':
                return """
    for (int i = 0; i < res.length; i++) {
        for (int j = 0; j < res[i].length; j++) {
            System.out.printf("\t%d", res[i][j]);
        }
        System.out.println();
    }
"""
            return ''

        # 保存Java代码模板
        for snippet in question['codeSnippets']:
            if snippet['lang'] != 'Java':
                continue

            code_dir = f"""{config['java_dir']}/lc{questionId}"""
            check_dir(code_dir)
            code_file = f"""{code_dir}/Main.java"""
            print('java code:', code_file)

            if os.path.exists(code_file):
                return open_solution(code_file)

            java_code = snippet['code']
            method_parsed = parse_java_method(java_code)
            method_res_type = method_parsed[1]
            args_count = (len(method_parsed) - 3) >> 1
            args_type_arr = []
            args_val_arr = []
            test_case_arr = question['sampleTestCase'].split('\n')

            for i in range(args_count):
                args_type_arr.append(method_parsed[3 + (i << 1)])
                args_val_arr.append(method_parsed[4 + (i << 1)])
                test_case_arr[
                    i
                ] = f"""\t\t{args_type_arr[i]} {args_val_arr[i]} = {case_input_formatter(test_case_arr[i])};"""
            case_code = '\n'.join(test_case_arr)
            caller_code = f"""\t\t{method_res_type} res = solution.{method_parsed[2]}({','.join(args_val_arr)});"""
            print_res_code = format_print_code(method_res_type)

            java_code = """
package lc%s;

import java.util.*;

%s

public class Main {

    public static void main(String[] args) {
        Solution solution = new Solution();
%s
%s
%s
    }

}
""" % (
                questionId,
                java_code,
                case_code,
                caller_code,
                print_res_code,
            )
            create_and_write_file(code_file, java_code)
            open_solution(code_file)

    def save_cpp_code(question):
        if CODE_TYPE != 'cpp' or open_code_flag is False:
            return

        def format_print_code(method_res_type):
            if method_res_type == 'int' or method_res_type == 'string':
                return '\tcout << res << endl;'
            if method_res_type == 'vector<int>' or method_res_type == 'int[]':
                return """
    for (int i = 0; i < res.size(); i++)
        printf("%d ", res[i]);
    cout << endl;
"""
            if method_res_type == 'vector<vector<int>>' or method_res_type == 'int[][]':
                return """
    for (int i = 0; i < res.size(); i++) {
        for (int j = 0; j < res[i].size(); j++) {
            printf("%d ", res[i][j]);
        }
        cout << endl;
    }
"""
            return ''

        # 保存 Cpp 代码模板
        cpp_code_loc = config['cpp_dir']
        for snippet in question['codeSnippets']:
            if snippet['lang'] != 'C++':
                continue
            questionId = question['questionFrontendId']
            file_name = f"""{cpp_code_loc}/main.{questionId}.cpp"""
            print('cpp code:', file_name)
            if os.path.exists(file_name):
                return open(file_name)
            cpp_code = snippet['code']
            method_parsed = parse_cpp_method(cpp_code)
            solution_code = f"""#include<iostream>
#include<algorithm>
#include<cstring>
#include<vector>
#include<queue>
#include<map>
#include<unordered_map>
#include<set>
#include<unordered_set>
#include<bitset>
#define x first
#define y second
#define PII pair<int, int>
using namespace std;

{cpp_code}
"""

            if len(method_parsed) == 0:
                create_and_write_file(file_name, solution_code)
                return open_solution(file_name)

            method_res_type = method_parsed[0]
            args_count = (len(method_parsed) >> 1) - 1
            args_type_arr = []
            args_val_arr = []
            test_case_arr = question['sampleTestCase'].split('\n')
            for i in range(args_count):
                args_type_arr.append(method_parsed[2 + (i << 1)])
                args_val_arr.append(method_parsed[3 + (i << 1)])
                test_case_arr[
                    i
                ] = f"""\t{args_type_arr[i]} {args_val_arr[i]} = {case_input_formatter(test_case_arr[i])};\n"""

            case_code = '\n'.join(test_case_arr)
            caller_code = f"""\t{method_res_type} res = solution.{method_parsed[1]}({','.join(args_val_arr)});"""
            print_res_code = format_print_code(method_res_type)
            main_code = """
%s

int main(){
    Solution solution;
%s
%s
%s
    return 0;
}
""" % (
                solution_code,
                case_code,
                caller_code,
                print_res_code,
            )

            create_and_write_file(file_name, main_code)
            open_solution(file_name)

    save_solver(question)

    if CODE_TYPE == 'java':
        save_java_code(question)
    elif CODE_TYPE == 'cpp':
        save_cpp_code(question)


def save_json_to_file(file_path, data):
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
        f.close()


if __name__ == '__main__':
    question_id = sys.argv[1]  # 题目编号
    pair = get_slug_by_frontened_id(question_id)
    slug = pair['stat']['question__title_slug']
    dir_path = f"""{LEETCODE_HOME}/tmp/questions"""
    check_dir(dir_path)
    question_file = f"""{dir_path}/{slug}.json"""
    if os.path.exists(question_file):
        question = json.load(open(question_file))
    else:
        question = crawler_problem(slug)
        save_json_to_file(question_file, question)

    pair['translatedTitle'] = question['translatedTitle']
    pair['tags'] = []
    for tag in question['topicTags']:
        pair['tags'].append(tag['translatedName'])
    print(
        'question info:\n',
        json.dumps(pair, indent=4, sort_keys=True, ensure_ascii=False),
    )

    save_question(question)
    print_question_url(question)
