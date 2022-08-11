var findKthArrays = function (nums1, nums2, k) {
  if (nums1.length + nums2.length < k) return -1; // 无效输入
  function dfs(nums1, nums2, start1, end1, start2, end2, k) {
    if (start1 == end1) return nums2[start2 + k - 1];
    if (start2 == end2) return nums1[start1 + k - 1];
    if (k == 1) return Math.min(nums1[start1], nums2[start2]);
    let i = k >> 1;
    if (start1 + i >= nums1.length) {
      // s1到头了
      if (nums1[nums1.length - 1] >= nums2[start2 + i - 1]) {
        return dfs(nums1, nums2, start1, end1, start2 + i, end2, k - i);
      }
      return dfs(
        nums1,
        nums2,
        end1,
        end1,
        start2,
        end2,
        k - nums1.length + start1
      ); // 去掉s1剩余部分
    }

    if (start2 + i >= nums2.length) {
      // s2到头了
      if (nums1[start1 + i - 1] < nums2[nums2.length - 1]) {
        // 去掉s1前半部分
        return dfs(nums1, nums2, start1 + i, end1, start2, end2, k - i);
      }
      return dfs(
        nums1,
        nums2,
        start1,
        end1,
        end2,
        end2,
        k - nums2.length + start2
      ); // 去掉s2剩余部分
    }
    if (nums1[start1 + i - 1] < nums2[start2 + i - 1]) {
      // 去掉s1前半部分
      return dfs(nums1, nums2, start1 + i, end1, start2, end2, k - i);
    } else {
      // 去掉s2前半部分
      return dfs(nums1, nums2, start1, end1, start2 + i, end2, k - i);
    }
  }
  return dfs(nums1, nums2, 0, nums1.length, 0, nums2.length, k);
};
