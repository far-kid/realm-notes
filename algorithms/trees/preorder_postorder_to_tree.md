# Construct a Tree from Preorder and Postorder Traversals

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
    TreeNode* build(vector<int>& preorder, 
    unordered_map<int,int>& post_mp, 
    int preL, int preR, int postL, int postR )
    {
        if(preL>preR){
            return nullptr;
        }

        if(preL==preR){
            return new TreeNode(preorder[preL]);
        }


        int ind = post_mp[preorder[preL+1]];

        TreeNode* newNode = new TreeNode(preorder[preL]);

        newNode->left = build(preorder,post_mp,preL+1,preL+ind-postL+1,postL,ind);
        newNode->right = build(preorder,post_mp,preL+ind-postL+2,preR,ind+1,postR-1);

        return newNode;
    }

    TreeNode* constructFromPrePost(vector<int>& preorder, vector<int>& postorder) {
        int n = preorder.size();
        unordered_map<int,int>post_mp;

        for(int i=0;i<n;i++){
            post_mp[postorder[i]] = i;
        }

        return build(preorder,post_mp,0,n-1,0,n-1);
    }
};
```
