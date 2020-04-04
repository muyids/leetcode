#include <cstdio>
#include <cstring>
#include <iostream>
#include <algorithm>
#include <cmath>
#include <vector>
#include <deque>
#include <queue>
using namespace std;
#define rep(i,a,n) for(int i=(a);i<(n);i++)
#define per(i,a,n) for(int i=(n)-1;i>=(a);i--)
#define mp make_pair
#define pb push_back

typedef double db;

const db EPS = 1e-8;

inline int sign(db a) {
	return a < -EPS ? -1 : a > EPS;
}

inline int cmp(db a, db b){//精度比较函数
	return sign(a-b);
}

struct P {//点
	db x, y;
	P() {}
	P(db _x, db _y) : x(_x), y(_y) {}
	P operator+(P p) { return P(x + p.x, y + p.y); }
	P operator-(P p) { return P(x - p.x, y - p.y); }
	P operator*(db d) { return P(x * d, y * d); }
	P operator/(db d) { return P(x / d, y / d); }
	bool operator<(P p) const {
		int c = cmp(x, p.x);
		if (c) return c == -1;
		return cmp(y, p.y) == -1;
	}
	db dot(P p) { return x * p.x + y * p.y; }//点积
	db det(P p) { return x * p.y - y * p.x; }//叉积
	db distTo(P p) { return (*this-p).abs(); }//距离
	db alpha() { return atan2(y, x); }//求极角
	void read() { cin>>x>>y; }
	db abs() { return sqrt(abs2());}//长度
	db abs2() { return x * x + y * y; }//长度的平方
	P rot90() { return P(-y,x);}//逆时针旋转90度
	P unit() { return *this/abs(); }//单位化
    int quad() const { return sign(y) == 1 || (sign(y) == 0 && sign(x) >= 0); }//极角是否在[0,180)之间
};

struct L{ //ps[0] -> ps[1]
	P ps[2];
	P& operator[](int i) { return ps[i]; }
	P dir() { return ps[1] - ps[0]; }//直线的方向向量
 	bool include(P p) { return sign((ps[1] - ps[0]).det(p - ps[0])) > 0; }//是否在左边（半平面交的时候有用）
 	L push(){ // push eps outward
 		const double eps = 1e-6;
 		P delta = (ps[1] - ps[0]).rot90().unit() * eps;
 		return {ps[0] - delta, ps[1] - delta};
 	}
};

#define cross(p1,p2,p3) ((p2.x-p1.x)*(p3.y-p1.y)-(p3.x-p1.x)*(p2.y-p1.y))
#define crossOp(p1,p2,p3) sign(cross(p1,p2,p3))

P isLL(P p1, P p2, P q1, P q2) {//求两直线交点
	db a1 = cross(q1, q2, p1), a2 = -cross(q1, q2, p2);
	return (p1 * a2 + p2 * a1) / (a1 + a2);
}

P isLL(L l1,L l2){ return isLL(l1[0],l1[1],l2[0],l2[1]); }//求两直线交点

bool intersect(db l1,db r1,db l2,db r2){
	if(l1>r1) swap(l1,r1); if(l2>r2) swap(l2,r2);
	return !( cmp(r1,l2) == -1 || cmp(r2,l1) == -1 );
}

bool isSS(P p1, P p2, P q1, P q2){
    return intersect(p1.x,p2.x,q1.x,q2.x) && intersect(p1.y,p2.y,q1.y,q2.y) &&
    crossOp(p1,p2,q1) * crossOp(p1,p2,q2) <= 0 && crossOp(q1,q2,p1)
            * crossOp(q1,q2,p2) <= 0;
}

bool isMiddle(db a, db m, db b) {//判断m是否在a,b之间
    return sign(a - m) == 0 || sign(b - m) == 0 || (a < m != b < m);
}

bool isMiddle(P a, P m, P b) {//判断点m的坐标是否在a,b之间
    return isMiddle(a.x, m.x, b.x) && isMiddle(a.y, m.y, b.y);
}

bool onSeg(P p1, P p2, P q){//判断点是否在直线上
	return crossOp(p1,p2,q) == 0 && isMiddle(p1, q, p2);
}

P proj(P p1, P p2, P q) {//关于直线的投影
    P dir = p2 - p1;
    return p1 + dir * (dir.dot(q - p1) / dir.abs2());
}

P reflect(P p1, P p2, P q){//关于直线的对称
	return proj(p1,p2,q) * 2 - q;
}

db nearest(P p1,P p2,P q){ //线段p1p2到q的最近距离
	P h = proj(p1,p2,q);
	if(isMiddle(p1,h,p2))
		return q.distTo(h);
	return min(p1.distTo(q),p2.distTo(q));
}

db disSS(P p1, P p2, P q1, P q2){ //线段和线段的距离
	if(isSS(p1,p2,q1,q2)) return 0;
	return min(min(nearest(p1,p2,q1),nearest(p1,p2,q2)), min(nearest(q1,q2,p1),nearest(q1,q2,p2)) );
}

db disSS(L l1,L l2){ //线段和线段距离
    return disSS(l1[0],l1[1],l2[0],l2[1]);
}

db rad(P p1,P p2){ // 返回p1p2关于原点的弧度
	return atan2l(p1.det(p2),p1.dot(p2));
}

db incircle(P p1, P p2, P p3){   //
	db A = p1.distTo(p2);
	db B = p2.distTo(p3);
	db C = p3.distTo(p1);
	return sqrtl(A*B*C/(A+B+C));
}

//polygon

db area(vector<P> ps){
	db ret = 0; rep(i,0,ps.size()) ret += ps[i].det(ps[(i+1)%ps.size()]);
	return abs(ret/2);
}
//引向右的虚线判断是否在多边形内
int contain(vector<P> ps, P p){ //2:inside,1:on_seg,0:outside
	int n = ps.size(), ret = 0;
	rep(i,0,n){
		P u=ps[i],v=ps[(i+1)%n];
		if(onSeg(u,v,p)) return 1;
		if(cmp(u.y,v.y)<=0) swap(u,v);
		if(cmp(p.y,u.y) >0 || cmp(p.y,v.y) <= 0) continue;
		ret ^= crossOp(p,u,v) > 0;
	}
	return ret*2;
}

vector<P> convexHull(vector<P> ps) { // 凸包
    int n = ps.size(); if(n <= 1) return ps;
    sort(ps.begin(), ps.end());
    vector<P> qs(n * 2); int k = 0;
    for (int i = 0; i < n; qs[k++] = ps[i++])
        while (k > 1 && crossOp(qs[k - 2], qs[k - 1], ps[i]) <= 0) --k;
    for (int i = n - 2, t = k; i >= 0; qs[k++] = ps[i--])
       	while (k > t && crossOp(qs[k - 2], qs[k - 1], ps[i]) <= 0) --k;
    qs.resize(k - 1);
    return qs;
}

vector<P> convexHullNonStrict(vector<P> ps) { //非严格凸多边形
	//caution: need to unique the Ps first
    int n = ps.size(); if(n <= 1) return ps;
    sort(ps.begin(), ps.end());
    vector<P> qs(n * 2); int k = 0;
    for (int i = 0; i < n; qs[k++] = ps[i++])
        while (k > 1 && crossOp(qs[k - 2], qs[k - 1], ps[i]) < 0) --k;
    for (int i = n - 2, t = k; i >= 0; qs[k++] = ps[i--])
       	while (k > t && crossOp(qs[k - 2], qs[k - 1], ps[i]) < 0) --k;
    qs.resize(k - 1);
    return qs;
}

db convexDiameter(vector<P> ps){ //旋转卡壳求凸多边形直径
	int n = ps.size(); if(n <= 1) return 0;
	int is = 0, js = 0; rep(k,1,n) is = ps[k]<ps[is]?k:is, js = ps[js] < ps[k]?k:js;
	int i = is, j = js;
	db ret = ps[i].distTo(ps[j]);
	do{
		if((ps[(i+1)%n]-ps[i]).det(ps[(j+1)%n]-ps[j]) >= 0)
			(++j)%=n;
		else
			(++i)%=n;
		ret = max(ret,ps[i].distTo(ps[j]));
	}while(i!=is || j!=js);
	return ret;
}

vector<P> convexCut(const vector<P>&ps, P q1, P q2) {
	vector<P> qs;
	int n = ps.size();
	rep(i,0,n){
		P p1 = ps[i], p2 = ps[(i+1)%n];
		int d1 = crossOp(q1,q2,p1), d2 = crossOp(q1,q2,p2);
		if(d1 >= 0) qs.pb(p1);
		if(d1 * d2 < 0) qs.pb(isLL(p1,p2,q1,q2));
	}
	return qs;
}

//min_dist

db min_dist(vector<P>&ps,int l,int r){
	if(r-l<=5){
		db ret = 1e100;
		rep(i,l,r) rep(j,l,i) ret = min(ret,ps[i].distTo(ps[j]));
		return ret;
	}
	int m = (l+r)>>1;
	db ret = min(min_dist(ps,l,m),min_dist(ps,m,r));
	vector<P> qs; rep(i,l,r) if(abs(ps[i].x-ps[m].x)<= ret) qs.pb(ps[i]);
	sort(qs.begin(), qs.end(),[](P a,P b) -> bool {return a.y<b.y; });
	rep(i,1,qs.size()) for(int j=i-1;j>=0&&qs[j].y>=qs[i].y-ret;--j) ret = min(ret,qs[i].distTo(qs[j]));
	return ret;
}

int type(P o1,db r1,P o2,db r2){
	db d = o1.distTo(o2);
	if(cmp(d,r1+r2) == 1) return 4;
	if(cmp(d,r1+r2) == 0) return 3;
	if(cmp(d,abs(r1-r2)) == 1) return 2;
	if(cmp(d,abs(r1-r2)) == 0) return 1;
	return 0;
}

vector<P> isCL(P o,db r,P p1,P p2){
	db x = (p1-o).dot(p2-p1), y = (p2-p1).abs2(), d = x * x - y * ((p1-o).abs2() - r*r);
	if(sign(d) < 0) return {};
	d = max(d,0.0); P m = p1 - (p2-p1)*(x/y), dr = (p2-p1)*(sqrt(d)/y);
	return {m-dr,m+dr}; //along dir: p1->p2
}

vector<P> isCC(P o1, db r1, P o2, db r2) { //need to check whether two circles are the same
	db d = o1.distTo(o2);
	if (cmp(d, r1 + r2) == 1) return {};
	d = min(d, r1 + r2);
	db y = (r1 * r1 + d * d - r2 * r2) / (2 * d), x = sqrt(r1 * r1 - y * y);
	P dr = (o2 - o1).unit();
	P q1 = o1 + dr * y, q2 = dr.rot90() * x;
	return {q1-q2,q1+q2};//along circle 1
}

vector<P> tanCP(P o, db r, P p) {//点到圆的两个切点
	db x = (p - o).abs2(), d = x - r * r;
	if (sign(d) <= 0) return {}; // on circle => no tangent
	P q1 = o + (p - o) * (r * r / x);
	P q2 = (p - o).rot90() * (r * sqrt(d) / x);
	return {q1-q2,q1+q2}; //counter clock-wise
}


vector<L> extanCC(P o1, db r1, P o2, db r2) {
	vector<L> ret;
	if (cmp(r1, r2) == 0) {
		P dr = (o2 - o1).unit().rot90() * r1;
		ret.pb({o1 + dr, o2 + dr}), ret.pb({o1 - dr, o2 - dr});
	} else {
		P p = (o2 * r1 - o1 * r2) / (r1 - r2);
		vector<P> ps = tanCP(o1, r1, p), qs = tanCP(o2, r2, p);
		rep(i,0,min(ps.size(),qs.size())) ret.pb({ps[i], qs[i]}); //c1 counter-clock wise
	}
	return ret;
}

vector<L> intanCC(P o1, db r1, P o2, db r2) {
	vector<L> ret;
 	P p = (o1 * r2 + o2 * r1) / (r1 + r2);
 	vector<P> ps = tanCP(o1,r1,p), qs = tanCP(o2,r2,p);
	rep(i,0,min(ps.size(),qs.size())) ret.pb({ps[i], qs[i]}); //c1 counter-clock wise
	return ret;
}

db areaCT(db r, P p1, P p2){
	vector<P> is = isCL(P(0,0),r,p1,p2);
	if(is.empty()) return r*r*rad(p1,p2)/2;
	bool b1 = cmp(p1.abs2(),r*r) == 1, b2 = cmp(p2.abs2(), r*r) == 1;
	if(b1 && b2){
		if(sign((p1-is[0]).dot(p2-is[0])) <= 0 &&
			sign((p1-is[0]).dot(p2-is[0])) <= 0)
		return r*r*(rad(p1,is[0]) + rad(is[1],p2))/2 + is[0].det(is[1])/2;
		else return r*r*rad(p1,p2)/2;
	}
	if(b1) return (r*r*rad(p1,is[0]) + is[0].det(p2))/2;
	if(b2) return (p1.det(is[1]) + r*r*rad(is[1],p2))/2;
	return p1.det(p2)/2;
}

bool parallel(L l0, L l1) { return sign( l0.dir().det( l1.dir() ) ) == 0; }//判断两直线是否平行

bool sameDir(L l0, L l1) { return parallel(l0, l1) && sign(l0.dir().dot(l1.dir()) ) == 1; }//判断两射线是否同向

bool cmp (P a,  P b) {
	if (a.quad() != b.quad()) {
		return a.quad() < b.quad();
	} else {
		return sign( a.det(b) ) > 0;
	}
}

bool operator < (L l0, L l1) {
	if (sameDir(l0, l1)) {
		return l1.include(l0[0]);
	} else {
		return cmp( l0.dir(), l1.dir() );
	}
}

bool check(L u, L v, L w) {
	return w.include(isLL(u,v));
}

vector<P> halfPlaneIS(vector<L> &l) {//求半平面交
	sort(l.begin(), l.end());
	deque<L> q;
	for (int i = 0; i < (int)l.size(); ++i) {
 		if (i && sameDir(l[i], l[i - 1])) continue;
 		while (q.size() > 1 && !check(q[q.size() - 2], q[q.size() - 1], l[i])) q.pop_back();
 		while (q.size() > 1 && !check(q[1], q[0], l[i])) q.pop_front();
 		q.push_back(l[i]);
 	}
	while (q.size() > 2 && !check(q[q.size() - 2], q[q.size() - 1], q[0])) q.pop_back();
	while (q.size() > 2 && !check(q[1], q[0], q[q.size() - 1])) q.pop_front();
	vector<P> ret;
	for (int i = 0; i < (int)q.size(); ++i) ret.push_back(isLL(q[i], q[(i + 1) % q.size()]));
	return ret;
}

int main(){
	return 0;
}



