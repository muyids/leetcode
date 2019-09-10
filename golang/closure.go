package golang

func sum(r int) func(adder int) int {
	return func(adder int) int {
		return r + adder
	}
}

