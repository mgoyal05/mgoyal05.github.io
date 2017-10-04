input = document.querySelector('.input_name');
errorName = document.querySelector('#errorName');
input_email = document.querySelector('.input_email');
errorEmail = document.querySelector('#errorEmail');
errorSubmit = document.querySelector('#errorSubmit');

function validateForm(val){
	if(val.length == 0){
		input.style.border =".1em solid black";
		errorName.textContent = 'Name is required';
		errorSubmit.disabled = true;
	}
	else{
		input.style.border ="0px solid black";
		errorName.textContent = '';
		errorSubmit.disabled = false;
	}
}

function validateEmail(val1){
	var reg1 = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	validateForm(input.value);
	if(reg1.test(val1) == false || input_email.value == "") {
		input_email.style.border =".1em solid black";
		errorEmail.textContent = 'Invalid email address';

		errorSubmit.disabled = true;
	} 
	else if(reg1.test(val1) == true) {
		input_email.style.border = "0px solid black";
		errorEmail.textContent = '';
		errorSubmit.disabled = false;
	}
}

function validateSubmit(){
	validateEmail(input_email.value);
}

var request = new XMLHttpRequest(), json;

request.onreadystatechange = function(){
	if(request.readyState === 4 && request.status === 200) {
		json = request.responseText;
		console.log('Working');
	}
};

request.open('GET', 'data.json', true);
request.send();
//Loading images from a JSON document
/*data.images.forEach( function(obj) {
  var img = new Image();
  img.src = obj.bannerImg1;
  img.setAttribute("alt", "effy");
  document.querySelector(".gallery").appendChild(img);
}); */