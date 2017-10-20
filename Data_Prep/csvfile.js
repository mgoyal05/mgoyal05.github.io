var arr = new Array();
var rows = "";
var data;
var code, desc, Rate;
function doCsv() {
	var strLength, dept;
	data = document.getElementsByClassName("MsoPlainText");
	for (var i = 6; i < data.length; i++) {
		
		arr[i] = data[i].innerText;

		if(arr[i].indexOf('ACCOM') == 0){
			break;
		}
		var str = arr[i].replace(/[\s]{2,}/g, " ").toString();
		var strArray = str.split(" ");
		strLength = strArray.length-2;

		if(str.indexOf('DEPARTMENT OF') >=0){
//			rows += "\n" + arr[i] + "\n;\n";
			dept = str.split('DEPARTMENT OF')[1];
		}
		else if(strLength > 1 && str[0] != '-'){
			code = strArray[0];
			Rate = strArray[strLength];
			desc = " ";
			for(var j = 1; j < strLength; j++){
				desc += strArray[j] + " ";
			}
			if(str.indexOf('CODE') == 0){
				rows += 'DEPARTMENT' + ";" + code + ";" + desc + ";" + Rate + "\n";
			}else{
			rows += dept + ";" + code + ";" + desc + ";" + Rate + "\n";
			}
		}
	}
	var mylink = document.createElement('a');
	mylink.download = 'csvfile.csv';
	mylink.href = 'data:text/csv;charset=utf-8,' + escape(rows);
	document.body.appendChild(mylink);
	mylink.click();

}