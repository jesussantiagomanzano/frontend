
const URL_PRODUCT = "http://localhost:8080/product";

var product = {'id':undefined, 'name': '', 'description': '', 'weight': ''};

var dataTable; 

init();


function addProduct(event){
    event.preventDefault(); 
    saveProduct();

}

function saveProduct(){
    $.ajax({
		url :  + "/",
		type : 'POST',
        headers: {
            "Content-Type": "application/json"
        },
		data : JSON.stringify(product),
       
		success : function(data) {
            console.log(data);
		},
        error: function(data) {
            console.log(data);
		}
	});

    document.getElementById('productForm').reset();
	product = {};
    $('#productForm').hide('toogle');
    
}



function initDataTable(data){
	let rowData = new Array();
	$.each(data, function(i, item){
		rowData.push([
		    item.barcode,
		    item.name,
		    item.description,
		    item.weight,
		    item.price, 
			item.id
		]);
	});
	dataTable.clear();
	dataTable.rows.add(rowData);
	dataTable.draw();
}
    
function init(){

	dataTable = $('#productTable').DataTable({
		'processing': true,
		//'serverSide': true,
		'responsive' : true,
		'autoWidth' : true,
		'ajax' : {
			url : URL_PRODUCT,
			type : 'GET',
			success: function(data) {
				console.log(data);
				initDataTable(data);
			},
			complete : function(){
				console.log('Complete.'); 
			},
			error : function(xhr, ajaxOptions, thrownError) {
				console.log('Error.'); // Poner mensaje de error
				console.log(xhr); // Poner mensaje de error
				console.log(ajaxOptions); // Poner mensaje de error
				console.log(thrownError); // Poner mensaje de error
			}
		},
		'columns' : [
				{title : 'Barcode'},
				{title : 'Producto'},
				{title : 'Descripcion'},
				{title : 'Peso'},				
                {title : 'Precio'},			
                {title : 'Accion', 
				'render' : function(data, type, row, meta) {
					return '<button class=\"btn btn-warning\"  id=\"' + data + '\" onclick ="{findProductById(' + data + ')}"/>Editar</button>';
				}}
			],
			'dom': "<'row' <'col-sm-12'l> > t <'row' <'col-sm-10'i> <'col-sm-10 textCenter'p> <'col-sm-2'> <'col-sm-1'B> >",
	});

}


function findProductById(id){
	console.log("El ID es:" + id);
	$.ajax({
		type : 'GET',
		url : URL_PRODUCT + "/findProductById/" + id,
		success : function(data) {
			console.log(data);
	
		}
	});

}



$('#productForm').hide();







