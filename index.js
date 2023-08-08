const container = document.querySelector(".container");
const button = document.querySelector("button");
const selectWrapper = document.querySelector(".select")
const selectFrom = document.querySelector("#select__from");
const selectTo = document.querySelector("#select__to");

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
	container.append(writeAmount());
	selectCurrency(selectFrom, response.data.rates);
	selectCurrency(selectTo, response.data.rates);
	console.log(response.data);

	button.addEventListener("click", () => {
		const amountValue = document.querySelector(".amount").value;
		let exchangeRate = selectFrom.value / selectTo.value;
		let result = Math.round(amountValue / exchangeRate);
		document.querySelector(".result").textContent = `${amountValue} ${selectFrom.options[selectFrom.selectedIndex].textContent} = ${result} ${selectTo.options[selectTo.selectedIndex].textContent}`
	})

} catch (error) {
	console.error(error);
}

// GET request API end

function writeAmount() {
	const typeAmountToConvert = document.createElement("input");
	typeAmountToConvert.classList.add("amount");
	typeAmountToConvert.setAttribute("placeholder", "Type amount");
	typeAmountToConvert.style.cssText = `
		position: absolute;
		left: 24px;
		top: 70px;
		width: 180px;
		height: 35px;
		border-radius: 4px;
		padding: 8px;
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

	typeAmountToConvert.addEventListener("input", (e) => {
		const inputValue = e.target.value;
	
		if (/\D/.test(inputValue)) {
			e.target.value = inputValue.replace(/\D/g, "");
		}
	});

	return typeAmountToConvert;
}

function selectCurrency(select, data) {
	for (let currency in data) {
		select.innerHTML += `
			<option value="${data[currency]}">${currency}</option>
		`;
	}

	return select;
}






// https://rapidapi.com/principalapis/api/currency-conversion-and-exchange-rates/pricing // here is the web site currency