
var input_url = document.querySelector("#input_url");
var input_name = document.querySelector('#input_name');
var input_msg = document.querySelector("#input_msg");
var input_date = document.querySelector("#input_date");
var input_urlEdit = document.querySelector('#input_urlEdit');
var input_nameEdit = document.querySelector('#input_nameEdit');
var input_msgEdit = document.querySelector('#input_msgEdit');
var input_dateEdit = document.querySelector('#input_dateEdit');
var modal = document.getElementById('AddModal');
var regexUrl = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
var currId = 0;

function validateUrl(val){
	if(regexUrl.test(val) == false || input_url.value == "") {
		input_url.style.border =".1em solid black";
		document.getElementById('errorUrl').textContent = 'Invalid Url!!!';
		document.getElementById('add-button').disabled = true;
	} 
	else if(regexUrl.test(val) == true) {
		input_url.style.border = "0px solid black";
		document.getElementById('errorUrl').textContent = '';
		document.getElementById('add-button').disabled = false;
	}
}

function validateName(val){
	validateUrl(input_url.value);
	if(val.length === 0){
		input_name.style.border =".1em solid black";
		document.getElementById('errorName').textContent = 'Name is required!!!';
		document.getElementById('add-button').disabled = true;
	}
	else{
		input_name.style.border ="0px solid black";
		document.getElementById('errorName').textContent = '';
		document.getElementById('add-button').disabled = false;
	}
}

function currDate(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd = '0'+dd
	} 

	if(mm<10) {
	    mm = '0'+mm
	} 

	today = yyyy + '-' + mm + '-' + dd;
	return today;
}

function validateDate(val){
	validateName(input_name.value);
	if(val.length == 0 || val > currDate()){
		input_date.style.border =".1em solid black";
		document.getElementById('errorDate').textContent = 'Invalid/Future Date!!!';
		document.getElementById('add-button').disabled = true;
		return false;
	}
	else{
		input_date.style.border ="0px solid black";
		document.getElementById('errorDate').textContent = '';
		document.getElementById('add-button').disabled = false;
		return true;
	}
}

function addingImage(e) {
		if(validateDate(input_date.value)){
		var imageArr = values.images;
		imageArr.push({
			"id" : imageArr.length,
			"input_url" : input_url.value,
			"input_name" : input_name.value,
			"input_msg" : input_msg.value,
			"input_date" : input_date.value
		});
		currId = imageArr.length-1;
		addNewImage(imageArr, currId);
		$("input[type=text]").val('');
		$("#AddModal").modal('hide');
	}
}
	// body...

function setImageAttributes(sampleImage, id, url, name, msg, date){
	sampleImage.src = url;
	sampleImage.setAttribute('id', id);
	sampleImage.setAttribute('alt', name);
	sampleImage.setAttribute('class', 'rounded img-fluid img-thumbnail')
	sampleImage.setAttribute('data-toggle', 'modal');
	sampleImage.setAttribute('data-target', "editModal");
	sampleImage.setAttribute('onclick', "getImageInfo("+id+ ")");
}

function addNewImage(imageArr, id) {
	var sampleImage = new Image();
	var imageAttribute = imageArr[id];
	setImageAttributes(sampleImage, id, imageAttribute.input_url, imageAttribute.input_name, imageAttribute.input_msg, imageAttribute.input_date);
	document.querySelector("#addImg").appendChild(sampleImage);
	alert('Image added');
	// body...
}

function getImageInfo(id) {
	var imageInfo = values.images[id];
 	input_urlEdit.value = imageInfo.input_url;
	input_nameEdit.value = imageInfo.input_name;
 	input_msgEdit.value = imageInfo.input_msg;
	input_dateEdit.value = imageInfo.input_date;
	currId = id;
	$("#editModal").modal('show');
	// body...
}

function validateEditForm(e){
	if(regexUrl.test(input_urlEdit.value) == false|| input_urlEdit.value == ""){
		alert('Invalid Url');
		return false;
	}
	if(input_nameEdit.value ==""){
		alert('Invalid name');
		return false;
	}
	if(input_dateEdit.value == '' || input_dateEdit.value > currDate()){
		alert('Invalid/Future date');
		return false;
	}
	return true;
}

function editImage(e) {
	if(validateEditForm(e)){
		var imageInfo = values.images[currId];
	 	imageInfo.input_url = input_urlEdit.value;
		imageInfo.input_name = input_nameEdit.value;
	 	imageInfo.input_msg = input_msgEdit.value;
		imageInfo.input_date = input_dateEdit.value;
		var image = document.getElementById(currId);
		setImageAttributes(image, currId, input_urlEdit.value, input_nameEdit.value, input_msgEdit.value, input_dateEdit.value);
		alert('Image changed');
		$("#editModal").modal('hide');
	}
	// body...
}

function removeImage(e){
	var delImage = document.getElementById(currId);
	values.images.splice(currId,1);
	document.querySelector('#addImg').removeChild(delImage);
	alert('Image Removed');
	$("#editModal").modal('hide');
}

values.images.forEach( function(obj) {
    var sampleImage = new Image();
	sampleImage.src = obj.input_url;
	sampleImage.setAttribute('id', obj.id);
	sampleImage.setAttribute('alt', obj.input_name);
	sampleImage.setAttribute('class', 'rounded img-fluid img-thumbnail')
	sampleImage.setAttribute('data-toggle', 'modal');
	sampleImage.setAttribute('data-target', "editModal");
	sampleImage.setAttribute('onclick', "getImageInfo("+obj.id+ ")");
	document.querySelector("#addImg").appendChild(sampleImage);
});