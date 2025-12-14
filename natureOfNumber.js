function numberChecker(x) {
    if (x==0){
        console.log("We are still researching either 0 is odd or even");
    }
    else if (x%2==0) {
        console.log(x + " is even number.");
    }
    else{
        console.log(x + " is odd number");
    }
}

for (i=1; i<=10; i++){
    const y = Math.floor(Math.random()*i);
    console.log(y);
    numberChecker(y);
}