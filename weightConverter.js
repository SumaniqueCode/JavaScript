const kg = 20;

function KgToMg(kg) {
    let Mg = kg * 1000000; 
    return Mg;
}
function KgToPound(kg){
    let pound = kg * 2.20462;
    return pound;
}
let result = KgToMg(kg);
console.log(kg + " Kg is equal to " + result + " Mg");

console.log(kg + " Kg is equal to " + KgToPound(kg) + " Pounds.");