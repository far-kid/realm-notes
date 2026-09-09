# Preorder, Inorder, and Postorder Traversal

```cpp
struct Node {
    int data;
    struct Node *left, *right;

    Node(int data)
    {
        this->data = data;
        left = right = NULL;
    }
};

void realmsDomain(Node* root){
    if(root==nullptr) return;

    /*
     - pop stack.top() and store 
    case1 : if ptr == 1;
        - add the node into preorder;
        - incremenet the node ptr and push {ptr, node}
        - push {node->left,1} into the stack if node->left!=nullptr
    case2 : if ptr == 2;
        - add the node intp inorder
        - incremenet the node ptr and push {ptr, node}
        - push {node->right,1} into the stack if node->right!=nullptr
    case3 : if ptr == 3
        - add the node intp postorder
    */

    vector<int>inorder,preorder,postorder;

    stack<pair<int,Node*>>st;
    st.push({1,root});

    while(!st.empty()){
        auto [ptr, node] = st.top();
        st.pop();

        if(ptr==1){
            preorder.push_back(node->val);
            st.push({ptr+1,node});

            if(node->left){
                st.push({1,node->left});
            }

        }else if(ptr==2){
            inorder.push_back(node->val);
            st.push({ptr+1,node});

            if(node->right){
                st.push({1,node->right});
            }

        }else{
            postorder.push_back(node->val);
        }
    }

    return;
}

```
