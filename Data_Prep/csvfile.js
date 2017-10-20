var arr = new Array();
var rows = "";
var data;
var code, desc, Rate;
function doCsv() {
	var strLength;
	data = document.getElementsByClassName("MsoPlainText");
	for (var i = 6; i < data.length; i++) {
		
		arr[i] = data[i].innerText;

		if(arr[i].indexOf('ACCOM') == 0){
			break;
		}
		var str = arr[i].replace(/[\s]{2,}/g, " ").toString();
		var str1 = str.split(" ");
		strLength = str1.length-2;

		if(str.indexOf('DEPART') ==0){
			rows += "\n" + arr[i] + "\n;\n";
		}
		else if(strLength > 0){
			code = str1[0];
			Rate = str1[strLength];
			desc = " ";
			for(var j = 1; j < strLength; j++){
				desc += str1[j] + " ";
			}
			rows += code + ";" + desc + ";" + Rate + "\n";
		}
	}
	var mylink = document.createElement('a');
	mylink.download = 'csvfile.csv';
	mylink.href = 'data:text/csv;charset=utf-8,' + escape(rows);
	document.body.appendChild(mylink);
	mylink.click();

}