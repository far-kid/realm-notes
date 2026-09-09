# Construct a Tree from Preorder and Inorder Traversals

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    TreeNode* build(vector<int>& preorder, unordered_map<int,int>& mp, int li, int ri, int lp, int rp){
        if(li>ri) return nullptr;

        int ind = mp[preorder[lp]];

        TreeNode* newNode = new TreeNode(preorder[lp]);
        newNode->left = build(preorder,mp,li,ind-1,lp+1,lp+ind-li);
        newNode->right = build(preorder,mp,ind+1,ri,lp+ind-li+1,rp);

        return newNode;
    }

    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        int n = preorder.size();

        unordered_map<int,int>mp;

        for(int i=0;i<n;i++){
            mp[inorder[i]] = i;
        }

        return build(preorder,mp,0,n-1,0,n-1);
    }
};
```
