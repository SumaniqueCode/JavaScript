function CelciusToFahrenheit(celcius) {
    let fahrenheit = (celcius * 1.8) + 32;
    console.log(celcius + " degree celsius is equal to " + fahrenheit +" fahrenheit");
}
function FahrenheitToCelcius(fahrenheit) {
    let celcius = Math.floor((fahrenheit * 0.5556) - 32);
    console.log(fahrenheit + " fahrenheit is equal to " + celcius +" degree celsius");
}

CelciusToFahrenheit(100)
FahrenheitToCelcius(100);
