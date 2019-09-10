package golang

import (
	"fmt"
	"testing"
)

func TestCountPrimes(t *testing.T) {
	r := CountPrimes(10)
	fmt.Println(r)
	if r != 4 {
		t.Fail()
	}
}

func TestCountPrimesEratosthenes(t *testing.T) {
	r := CountPrimes(10)
	fmt.Println(r)
	if r != 4 {
		t.Fail()
	}
}
