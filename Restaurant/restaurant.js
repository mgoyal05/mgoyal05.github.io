var table_body = document.querySelector("#table_body");
var total_bill = document.querySelector('#total_bill');
var curr_table;

var tables = values.tables;
var Menu_items = values.Menu_items;
var order_details_arr = new Array(tables.length);
for(i = 0; i < tables.length; i++){
	order_details_arr[i] = new Map();
}

function showTable(id) {

	$("#BillModal").modal('show');
	$('#modal-heading').html("Table-" + (id+1) + " | Order Details");
	curr_table = id;
	updateBill(id);
}

function updateBill(table_id){
	var text = '';
	var Sno = 1;
	order_details_arr[table_id].forEach(function(value, key) {
			var item = Menu_items[key];
			text += '<tr><th>' + Sno + '</th>';
			text += '<th>' + item.item + '</th>';
			text += '<th>' + item.price + '</th>';
			text += '<th>' + '<input type= number min = 1 value = ' + value + ' onchange = "updateServing('+ item.id +', this.value)"></th>';
			text += '<th><img src=delete.png height=20px onclick=deleteRow(' + Sno + ',' + key + ')></th></tr>';
			Sno++;
		});
	console.log('updated');
	table_body.innerHTML = text;
	total_bill.innerHTML = '<center>Total Bill: ' + tables[table_id].Total + '</center>';
	document.getElementById('table_' + table_id).innerHTML = "<h2>Table-" + (tables[table_id].id + 1) + "</h2>Rs." + tables[table_id].Total + " | Total items: " + tables[table_id].Total_items;
}

function updateServing(item_id, value){
	if(value == ''){
		value = 1;
	}
	var curr = parseInt(value);
	var prev = order_details_arr[curr_table].get(item_id);
	tables[curr_table].Total_items -= prev;
	tables[curr_table].Total -= (Menu_items[item_id].price*prev);
	console.log(tables[curr_table]);
	order_details_arr[curr_table].set(item_id, curr);
	tables[curr_table].Total_items += curr;
	tables[curr_table].Total += (Menu_items[item_id].price*curr);
	console.log(tables[curr_table]);
	updateBill(curr_table);
}

function deleteRow(index, key){
    document.getElementById("myTable").deleteRow(index);
	var value = order_details_arr[curr_table].get(key);
	tables[curr_table].Total_items -= value;
	tables[curr_table].Total -= (Menu_items[key].price*value);
    order_details_arr[curr_table].delete(key);
    updateBill(curr_table);
}

function generateBill() {
	alert('Please Pay amount of Rs.' + tables[curr_table].Total);
	order_details_arr[curr_table].clear();
	tables[curr_table].Total = 0,
	tables[curr_table].Total_items = 0;
	updateBill(curr_table);
}

function SearchTable(val){
	searchText = val.toLowerCase();
    textContent = document.getElementById("allTables").getElementsByTagName("h2");
    for (i = 0; i < tables.length; i++) {
        if (textContent[i].innerHTML.toLowerCase().indexOf(searchText) == -1) {
            document.getElementById("table_" + i ).style.display = "none";
        } else {
            document.getElementById("table_" + i ).style.display = "";
        }
    }
}

function SearchMenu(val) {
	searchText = val.toLowerCase();
    textContent = document.getElementById("allMenu").getElementsByTagName("h2");
    for (i = 0; i < Menu_items.length; i++) {
        if (textContent[i].innerHTML.toLowerCase().indexOf(searchText) == -1) {
            document.getElementById("item_" + i ).style.display = "none";
        } else {
            document.getElementById("item_" + i ).style.display = "";
        }
    }
}

function dragItems(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev, id) {
    ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
    var table_id = parseInt(id.charAt(6));
	var item_id = parseInt(data.charAt(5));
	tables[table_id].Total += Menu_items[item_id].price;
	tables[table_id].Total_items += 1; 
    document.getElementById(id).innerHTML = "<h2>Table-" + (tables[table_id].id + 1) + "</h2>Rs." + tables[table_id].Total + " | Total items: " + tables[table_id].Total_items;
    updateOrder(table_id, item_id);
}

function updateOrder(table_id, item_id){
	var order_details = tables[0].order_details;
	if(order_details_arr[table_id].has(item_id)){
		var servings = order_details_arr[table_id].get(item_id);
		order_details_arr[table_id].set(item_id, ++servings);
	}
	else{
		order_details_arr[table_id].set(item_id, 1);
	}
}

tables.forEach(function (obj) {
	// body...
	var button = document.createElement('BUTTON');
	button.setAttribute('id', "table_" + obj.id);
	button.setAttribute('type', 'button');
	button.setAttribute('class','btnRegister btn btn-primary btn-lg btn-block');
	button.setAttribute('data-toggle','modal');
	button.setAttribute('ondrop', 'drop(event, this.id)');
	button.setAttribute('ondragover', 'allowDrop(event)');
	button.setAttribute('data-target','#BillModal');
	button.setAttribute('onclick','showTable('+ obj.id + ')');
	button.innerHTML = "<h2>Table-" + (obj.id +1) + "</h2>Rs." + obj.Total + " | Total items: " + obj.Total_items;
	document.querySelector('#allTables').appendChild(button);
})

Menu_items.forEach(function (obj) {
	var button = document.createElement('BUTTON');
	button.setAttribute('id', "item_" + obj.id);
	button.setAttribute('type', 'button');
	button.setAttribute('class','btnRegister btn btn-primary btn-lg btn-block');
	button.setAttribute('draggable','true');
	button.setAttribute('ondragstart','dragItems(event)');
	button.innerHTML = "<h2>" + obj.item + "</h2>Rs." + obj.price;
	document.querySelector('#allMenu').appendChild(button);
})
