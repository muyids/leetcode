package playground

import "testing"

func TestIsPalindrome(t *testing.T) {
	IsPalindrome("")
}

func TestPartition(t *testing.T) {
	Partition("aab")
}

func TestIsIsomorphic(t *testing.T) {
	r := IsIsomorphic("egg", "add")
	if r != true {
		t.Fail()
	}
	r = IsIsomorphic("foo", "bar")
	if r != false {
		t.Fail()
	}
	r = IsIsomorphic("paper", "title")
	if r != true {
		t.Fail()
	}
	r = IsIsomorphic("ab", "aa")
	if r != false {
		t.Fail()
	}
}
