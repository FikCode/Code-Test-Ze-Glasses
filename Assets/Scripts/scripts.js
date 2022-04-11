$( document ).ready(function() {
    
let filter = "none";
const productNode = document.getElementById("filtered");
const cardTemplate = function (id, name, img, price) {
    return  `<div class="halfWidth">
                <div class="halfWidthImgCont">
                    <img src="${img}" alt="Brioni vintage" class="productImage">
                </div>
                <div class="prodDetails">
                    <p>BRIONI</p>
                    <p>${name}</p>
                    <p><strong>Model ref: ${id}</strong></p>
                </div>
                <div class="price">
                    <p>${price}</p>
                </div>
            </div>`;
};

$("input").change(function(){ 
    let checkboxes = $('input[name="color"]:checked');
    let allFilters = []
    for (let checkbox of checkboxes) {
        allFilters.push(checkbox.value);
    }
    //$(this).is(':checked')?filter = $(this).attr('id'): filter = "none"
    if(allFilters.length >0){
        $(".mainProducts").css("display", "none")
        $(".lastProducts").css("display", "none")
        $(".filtered").css("display", "flex")
        productNode.innerHTML = ""
        for(let color of allFilters){
            filterProducts(color)
        }
        
    }else{
        $(".mainProducts").css("display", "flex")
        $(".lastProducts").css("display", "flex") 
        $(".filtered").css("display", "none")
    }
    console.log(filter)
    console.log(allFilters)
})

const filterProducts = (filter) =>{
    fetch('./Assets/products/products.json')
    .then(response => response.json())
    .then(function(products){
    const filtered = products.filter((product)=>{
        if(product.color == filter){
        return product
        }
    })
    
    filtered.forEach((product)=>{
        let prodId = product.id;
        let prodName = product.name;
        let prodImg = product.image
        let prodPrice = product.price;
        productNode.innerHTML += cardTemplate(prodId,prodName,prodImg,prodPrice)
    })

    console.log(filtered)
    });
}


    



});

