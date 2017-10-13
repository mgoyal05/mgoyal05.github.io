input = document.querySelector('.input_name');
errorName = document.querySelector('#errorName');
input_email = document.querySelector('.input_email');
errorEmail = document.querySelector('#errorEmail');
errorSubmit = document.querySelector('#errorSubmit');

function validateName(val){
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
	validateName(input.value);
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

function validateSubmit(e){
	e.preventDefault();
	validateEmail(input_email.value);
}

//Loading images from a JSON document
data.images.forEach( function(obj) {
  var img = new Image();
  img.src = obj.bannerImg1;
  img.setAttribute("alt", "effy");
  document.querySelector('.gallery').appendChild(img);
});