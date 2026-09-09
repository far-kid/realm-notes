# Knuth-Morris-Pratt (KMP) Algorithm

```cpp
class Solution {
public:

    vector<int>prefix_function(string &s){
        int n = s.size();

        vector<int>pi(n);

        for(int i=1;i<n;i++){
            int j=pi[i-1];

            while(j>0 && s[i]!=s[j]){
                j = pi[j-1];
            }

            if(s[i]==s[j]){
                j++;
            }

            pi[i]=j;
        }

        return pi;
    }




    int strStr(string haystack, string needle) {
        int m = needle.size(),n = haystack.size();

        vector<int>pi = prefix_function(needle);

        int i=0,j=0;

        while(i<n){
            if(haystack[i]==needle[j]){
                i++;
                j++;

                if(j==m){
                    return i-m;
                }
            }else{
                if(j==0){
                    i++;
                }else{
                    j=pi[j-1];
                }
            }
        }



        return -1;
    }
};
```
