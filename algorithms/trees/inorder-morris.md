# Morris Inorder Traversal

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
    void inorder(TreeNode* root,vector<int>&ans){
        TreeNode* curr = root;

        /*
        case 1 : left is null
            add the curr->val
            curr = curr->right
        case 2 : left is not null;
            - find the rightmost node of the left subtree , incase of single node, that node is the rightmost node
            - case 2a : if this rightmode node has thread to curr node,
                - break the thread
                - add the curr->val
                - curr = curr->right
            - case 2b : if this rightmode node doesn't has thread to curr node
                - make a thread from this node to curr node;
                - curr = curr->left
        */

        while(curr!=nullptr){
            if(curr->left==nullptr){
                ans.push_back(curr->val);
                curr = curr->right;
            }else{
                TreeNode* temp = curr->left;
                while(temp->right!=nullptr && temp->right!=curr){
                    temp = temp->right;
                }

                if(temp->right==nullptr){
                    temp->right = curr;
                    curr = curr->left;
                }else{
                    temp->right = nullptr;
                    ans.push_back(curr->val);
                    curr = curr->right;
                }
            }
        }
        return ;
    }

    vector<int> inorderTraversal(TreeNode* root) {
        vector<int>ans;
        inorder(root,ans);

        return ans;    
    }
};

```
