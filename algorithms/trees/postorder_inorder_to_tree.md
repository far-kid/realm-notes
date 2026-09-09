# Construct a Tree from Postorder and Inorder Traversals

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
    TreeNode* build(vector<int>& postorder, unordered_map<int,int> &mp,int li, int ri, int lp,int rp){
        if(li>ri) return nullptr;

        int ind = mp[postorder[rp]];

        TreeNode* newNode = new TreeNode(postorder[rp]);
        newNode->left = build(postorder,mp,li, ind-1, lp, lp+ind-li-1);
        newNode->right = build(postorder,mp,ind+1,ri, lp+ind-li,rp-1);

        return newNode;
    }

    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        int n = inorder.size();
        unordered_map<int,int>mp;

        for(int i=0;i<inorder.size();i++){
            mp[inorder[i]] = i;
        }

        return build(postorder,mp,0,n-1,0,n-1);
    }
};

```
