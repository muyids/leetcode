package playground

import (
	"testing"
)

func TestLadderLength(t *testing.T) {
	beginWord := "hit"
	endWord := "cog"
	wordList := []string{"hot", "dot", "dog", "lot", "log", "cog"}
	r := LadderLength(beginWord, endWord, wordList)
	if 5 != r {
		t.Fatal(r)
	}

	wordList = []string{"hot", "dot", "dog", "lot", "log"}
	r = LadderLength(beginWord, endWord, wordList)
	if 0 != r {
		t.Fatal(r)
	}
	//beginWord := "hot"
	//endWord := "dog"
	//wordList := []string{"hot", "dog", "dot"}
	//r := LadderLength(beginWord, endWord, wordList)
	//if 3 != r {
	//	t.Fatal(r)
	//}
}
