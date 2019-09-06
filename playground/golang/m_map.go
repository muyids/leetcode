package playgrounds

type M struct {
	Map map[string]string
}

func Map() *M {
	return &M{Map: make(map[string]string)}
}

// Set ...
func (m *M) Set(key, value string) {
	m.Map[key] = value
}

// Get ...
func (m *M) Get(key string) string {
	return m.Map[key]
}

// 是否存在
func IfExist(this *M, key string) bool {
	if _, ok := this.Map[key]; ok {
		return true
	}
	return false
}

