# Quickselect

```cpp
int quickSelect(vector<int>&nums, int k, int l, int r){

    int pInd = l+(r-l)/2;
    swap(nums[pInd],nums[r]);

    int pivot = nums[r];

    int i=l,j=r-1;

    while(i<=j){

        while(i<=j && nums[i]<pivot) i++;
        while(i<=j && nums[j]>pivot) j--;


        if(i<=j){
            swap(nums[i],nums[j]);
            i++;
            j--;
        }
    }

    swap(nums[i],nums[r]);

    if(i==k){
        return nums[i];
    }else if(k<i){
        return quickSelect(nums,k,l,i-1);
    }

    return quickSelect(nums,k,i+1,r);
}

```
