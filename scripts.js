"use strict";

let illions = [null, "Thousand", "M", "B", "Tr", "Quadr", "Quint", "Sext", "Sept", "Oct", "Non", "Dec", "Undec", "Duodec", "Tredec", "Quattuordec", "Quindec", "Sexdec", "Septendec", "Octodec", "Novemdec", "Vigint"];
let yllions = [null, "Myriad", "M", "B", "Tr", "Quadr", "Quint", "Sext", "Sept", "Oct", "Non", "Dec", "Undec", "Duodec", "Tredec", "Quattuordec", "Quindec", "Sexdec", "Septendec", "Octodec", "Novemdec", "Vigint"];
let ones = [null, "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
let tens = [null, null, "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

var num = document.getElementById("number");
num.oninput = updatens;

function updatens(e){
	var el = e.target.value.length;
	e.target.style.width = 6 + ((el>10) ? (0.57*(el-10)) : 0) + "em";

	let div = document.getElementById("names");
	let txt = e.target.value;

	div.innerHTML = "";
	putCoiso(div, "Shortest Scale", txt.parseShortest());
	putCoiso(div, "Short Scale", txt.parseShort());
	putCoiso(div, "Long Scale", txt.parseLong());
	putCoiso(div, "Conway Scale", txt.parseConway());
}

function putCoiso(el, title, text){
	let h = document.createElement("h3");
	let t = document.createElement("span");
	h.innerHTML = title;
	t.innerHTML = text;
	el.appendChild(h);
	el.appendChild(t);
}

String.prototype.app = function(str){
	let sep = this ? " " : "";
	return this + ((str && str !== "null") ? (sep + str) : "");
};

String.prototype.splitNum = function(sp){
	let num = this;
	let splitted = [];
	sp = sp || 1;

	while (num.length>0){
		let j = (num.length-sp >= 0) ? num.length-sp : 0;
		splitted.unshift(num.substr(j));
		num = num.substr(0, j);
	}

	return splitted;
};

String.prototype.parseShortest = function(){
	let splitted = this.splitNum(3);
	let str = "";

	for (let i=0; i<splitted.length; i++){
		let j = splitted.length-i-1;
		str = str.app(parseInt(splitted[i]));
		if (parseInt(splitted[i]) !== 0) str = str.app(illions[j]+(j>1 ? "illion" : ""));
	}

	return str;
};

String.prototype.parseShort = function(){
	let splitted = this.splitNum(3);
	let str = "";

	for (let i=0; i<splitted.length; i++){
		let j = splitted.length-i-1;
		str = str.app(nameHundreds(splitted[i]));
		if (parseInt(splitted[i]) !== 0) str = str.app(illions[j]+(j>1 ? "illion" : ""));
	}
	return str;
};

String.prototype.parseLong = function(){
	let splitted = this.splitNum(6);
	let str = "";

	for (let i=0; i<splitted.length; i++){
		let j = splitted.length-i-1;
		str = str.app(nameHundreds(splitted[i]));
		if (parseInt(splitted[i]) !== 0 && j>=1) str = str.app(illions[j+1]+"illion");
	}
	return str;
};

String.prototype.parseConway = function(){
	let splitted = this.splitNum(4);
	let str = "";

	for (var i=0; i<splitted.length; i++){
		let j = splitted.length-i-1;
		str = str.app(nameHundreds2(splitted[i]));
		if (parseInt(splitted[i]) !== 0) str = str.app(illions[j]+(j>1 ? "yllion" : ""));
	}
	return str;
};

function nameHundreds(n){
	let num = parseInt(n);
	let str = "";

	if (num>=1000){
		str = str.app(nameHundreds(Math.floor(num/1000)));
		str = str.app("Thousand");
		num = num % 1000;
	}

	if (num>=100){
		str = str.app(ones[Math.floor(num/100)]);
		str = str.app("Hundred");
		num = num % 100;
	}

	return str.app(num>=20 ? tens[Math.floor(num/10)] + ((num%10 == 0) ? "" : " "+ones[num%10]) : ones[num]);
}

function nameHundreds2(n){
	let num = parseInt(n);
	let str = "";

	if (num>=100){
		str = str.app(nameHundreds2(Math.floor(num/100)));
		str = str.app("Hundred");
		num = num % 100;
	}

	return str.app(num>=20 ? tens[Math.floor(num/10)] + ((num%10 == 0) ? "" : "-"+ones[num%10]) : ones[num]);
}
