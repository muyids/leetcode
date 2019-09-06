package playgrounds

// 127. 单词接龙
func LadderLength(beginWord string, endWord string, wordList []string) int {
	begin := -1
	end := -1

	for i, item := range wordList {
		if item == beginWord {
			begin = i
		} else if item == endWord {
			end = i
		}
	}
	if begin == -1 {
		wordList = append([]string{beginWord}, wordList...)
	}
	if -1 == end {
		//wordList = append(wordList, endWord)
		return 0
	}

	for i, item := range wordList {
		if item == beginWord {
			begin = i
		} else if item == endWord {
			end = i
		}
	}

	// 初始化无向图
	routes := make(map[int][]int)
	for i := 0; i < len(wordList)-1; i++ {
		for j := i + 1; j < len(wordList); j++ {
			s1 := wordList[i]
			s2 := wordList[j]
			connected := false
			for i := 0; i < len(s1); i++ {
				if s1[i] != s2[i] {
					if connected == false {
						connected = true
					} else {
						connected = false
						break
					}
				}
			}
			if connected {
				routes[i] = append(routes[i], j)
				routes[j] = append(routes[j], i)
			}
		}
	}

	count := 0
	store := make([]int, len(wordList))
	queue := make([]int, 0)
	for _, j := range routes[begin] {
		if store[j] != 1 {
			queue = append(queue, j)
			store[j] = 1
		}
	}
	for len(queue) > 0 {
		count++
		next := make([]int, 0)
		for _, start := range queue {
			for _, item := range routes[start] {
				if item == end {
					return count + 1
				}
				if store[item] != 1 {
					next = append(next, item)
					store[item] = 1
				}
			}
		}
		queue = next
	}
	return 0
}
