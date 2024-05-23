
const URL_PRODUCT = "http://localhost:8080/product";

var product = {'id':undefined, 'name': '', 'description': '', 'weight': ''};


function addProduct(event){
    event.preventDefault(); 
    saveProduct();


}

function saveProduct(){
    $.ajax({
		url : URL_PRODUCT,
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
}



