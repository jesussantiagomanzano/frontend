
const URL_PRODUCT = "http://localhost:8080/product";

var product = {'id':undefined, 'name': '', 'description': '', 'weight': ''};

var dataTable; 



function addProduct(event){
    event.preventDefault(); 
    saveProduct();
}


function saveProduct(){
    $.ajax({
		url :  URL_PRODUCT,
		type : product.id === undefined ? 'POST' : 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
		data : JSON.stringify(product),
       
		success : function(data) {
			document.getElementById('productForm').reset();
			product = {};
			showAddProductBtn();
			dataTable.ajax.reload();
		},
        error: function(data) {
            console.log(data);
		}
	});
    
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
	showAddProductBtn();
	$('#productForm').hide();
	dataTable = $('#productTable').DataTable({
		'processing': true,
		//'serverSide': true,
		'responsive' : true,
		'autoWidth' : true, 
		searching: false,
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
					return '<button class=\"btn btn-warning\"  id=\"' + data + '\" onclick ="{findProductById(' + data + ')}"/>Editar</button>' + 
					'<button class=\"btn btn-danger\"  id=\"' + data + '\" onclick ="{showDeleteModal(' + data + ')}"/>Eliminar</button>';
				}}
			],
			'dom': "<'row' <'col-sm-12'l> > t <'row' <'col-sm-10'i> <'col-sm-10 textCenter'p> <'col-sm-2'> <'col-sm-1'B> >",
	});

}

var idProductDelete;
function showDeleteModal(id){
	$('#deleteModal').modal('show');
	idProductDelete = id;
}

function deleteProductById(){
	console.log("ID a eliminar:" +  idProductDelete);
	$.ajax({
		type : 'DELETE',
		url : URL_PRODUCT + "/" + idProductDelete,
		success : function(data) {
			console.log(data);
			dataTable.ajax.reload();
		}
	});
}

function showAddProductBtn(){
	$('#addProductBtn').show();
	$('#table').show();
    $('#productForm').hide('toogle');
    document.getElementById('productForm').reset();
	$('#productTable').show();
	
}

function findProductById(id){
	$('#productTable').hide('toogle');
	console.log("El ID es:" + id);
	$.ajax({
		type : 'GET',
		url : URL_PRODUCT + "/findProductById/" + id,
		success : function(data) {
			console.log(data);
			product = data;
			$('#id').val(data.id);
			$('#name').val(data.name);
			$('#barcode').val(data.barcode);
			$('#price').val(data.price);
			$('#description').val(data.description);
			$('#weight').val(data.weight);
	
		}
	});
	$('#productForm').show('toogle');
	$('#submitBtn').text('Guardar cambios');
	$('#addProductBtn').hide();
	$('#table').hide();
	

}


function addProduct(){
	$('#productForm').show('toogle');
	if(product.id === undefined){
		$('#submitBtn').text('Agregar producto');
	}
	$('#productTable').hide();
	$('#addProductBtn').hide();
	$('#table').hide();
}


init();







