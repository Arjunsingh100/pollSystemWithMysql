const arr1 = [3, 2, 22, 11, 33, 6, 7, 12, 23, 89, 10, 56, 65, 34, 23, 12];
const arr2 = [12, 10];

const filteredArray = arr1.map((ele, index) => {
    const filteredELe = arr2.includes(ele);
    if (filteredELe == false) {
        return ele;
    }
    else {
        return;
    }
})

console.log(filteredArray);