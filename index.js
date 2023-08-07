const container = document.querySelector(".container");

// GET request API start

const options = {
  method: 'GET',
  url: 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest',
  params: {
    from: 'USD',
    to: 'EUR,GBP'
  },
  headers: {
    'X-RapidAPI-Key': '70179ccb2amsh6462a27bbd29d23p1b4c59jsn7326a20c04ba',
    'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	writeAmount()
	selectCurrency(response.data.rates);
	selectCurrency(response.data.rates);
	console.log(response.data);
} catch (error) {
	console.error(error);
}

// GET request API end


function writeAmount() {
	const typeAmountToConvert = document.createElement("input");
	typeAmountToConvert.setAttribute("placeholder", "Type amount");
	typeAmountToConvert.style.cssText = `
		width: 180px;
		height: 35px;
		border-radius: 4px;
		border: none;
		outline: none;
		background-color: #eee;
	`;
	  
	typeAmountToConvert.addEventListener("focus", (e) => {
		typeAmountToConvert.placeholder = "";
	});

	typeAmountToConvert.addEventListener("blur", (e) => {
		typeAmountToConvert.placeholder = "Type amount";
	});

	container.append(typeAmountToConvert);
}

function selectCurrency(data) {
	const select = document.createElement("select");
	select.setAttribute("name", "currencies")
	for (let currency in data) {
		console.log(currency)
		select.innerHTML += `
			<option value="${data[currency]}">${currency}</option>
		`
	}
	
	container.append(select);
}














// https://rapidapi.com/principalapis/api/currency-conversion-and-exchange-rates/pricing // here is the web site currency