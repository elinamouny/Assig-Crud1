var ProdName = document.getElementById("pname");
var ProdPrice = document.getElementById("pprice");
var ProdCategory = document.getElementById("pcategory");
var ProdDesc = document.getElementById("pdesc");
var productList = [];

if (localStorage.getItem("allProducts")) {
  productList = JSON.parse(localStorage.getItem("allProducts"));
  displayProducts();
}

function AddProduct() {
  var product = {
    Name: ProdName.value,
    Price: ProdPrice.value,
    Category: ProdCategory.value,
    Desc: ProdDesc.value,
  };
  productList.push(product);
  localStorage.setItem("allProducts", JSON.stringify(productList));
  displayProducts();
  clearform();
}

function displayProducts() {
  var productTableBody = document.getElementById("productTableBody");
  productTableBody.innerHTML = "";

  for (var i = 0; i < productList.length; i++) {
    productTableBody.innerHTML += `<tr>
      <td>${i + 1}</td>  
      <td>${productList[i].Name}</td>  
      <td>${productList[i].Price}</td>  
      <td>${productList[i].Category}</td>  
      <td>${productList[i].Desc}</td>  
      <td>
        <button onclick="editProduct(${i})" class="btn btn-danger">Edit</button>
      </td>
      <td>
        <button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button>
      </td>
    </tr>`;
  }
}

function clearform() {
  ProdName.value = "";
  ProdPrice.value = "";
  ProdCategory.value = "";
  ProdDesc.value = "";
}

function editProduct(index) {
  ProdName.value = productList[index].Name;
  ProdPrice.value = productList[index].Price;
  ProdCategory.value = productList[index].Category;
  ProdDesc.value = productList[index].Desc;

  document.getElementById("updateBtn").classList.remove('d-none');
}

function deleteProduct(index) {
  console.log('Deleted');
  productList.splice(index, 1);
  localStorage.setItem("allProducts", JSON.stringify(productList));
  displayProducts();
}



  function updateProduct(index) {
    productList[index].Name = ProdName.value;
    productList[index].Price = ProdPrice.value;
    productList[index].Category = ProdCategory.value;
    productList[index].Desc = ProdDesc.value;

    localStorage.setItem("allProducts", JSON.stringify(productList));
    displayProducts();

   
    clearform();
    document.getElementById("updateBtn").classList.add('d-none');
  }

 
  function searchProduct() {
    var searchValue = document.getElementById('psearch').value.toLowerCase();
    var table = document.getElementById('productTableBody');
    var rows = table.getElementsByTagName('tr');

    for (var i = 0; i < rows.length; i++) {
      var name = rows[i].getElementsByTagName('td')[1].innerText.toLowerCase();

      if (name.includes(searchValue)) {
        rows[i].style.display = '';
      } else {
        rows[i].style.display = 'none';
      }
    }
  }
  function validateForm() {
    var productName = document.getElementById('pname').value;
    var productPrice = document.getElementById('pprice').value;
    var productCategory = document.getElementById('pcategory').value;

    if (productName === '' || productPrice === '' || productCategory === '') {
      alert('Please fill in all the required fields.');
    } else {
      AddProduct();
    }
  }