function Wildcards(str) {

  // code goes here 
  const arrStr = str.split(' ');
  const secondStr = arrStr[1];
  console.log(secondStr)
  let firstStr = '';
  for (let i = 0; i <= secondStr.length; i++) {
    console.log('this is for loop')
    console.log(secondStr.charAt(i))
    if (secondStr.charAt(i).match(/[a-zA-Z]/) && secondStr.charAt(i) != secondStr.charAt(i - 1)) {
      firstStr = firstStr + '+'
    }
    if (secondStr.charAt(i).match(/[1-9]/)) {
      firstStr = firstStr + '$'
    }
    if (secondStr.charAt(i) == secondStr.charAt(i - 1)) {
      if (secondStr.charAt(i) == secondStr.charAt(i + 1) == secondStr.charAt(i - 1)) {
        firstStr = firstStr.substring(0, firstStr.length - 1)
        firstStr = firstStr + '*';
        i = i + 2;
      }
      else {
        let count = 0
        for (let j = i; secondStr.charAt(j) == secondStr.charAt(j + 1); j++) {
          count = count + 1;
          i = i + 1;
          firstStr = firstStr.substring(0, firstStr.length - 1);
          firstStr = firstStr + `{${count}}`
        }
      }
    }
  }
  console.log(firstStr)
}

let testString = "$**+*{2} 9mmmrrrkbb";
Wildcards(testString)
console.log("this is codeByte")
// // keep this function call here
// console.log(Wildcards(readline()));