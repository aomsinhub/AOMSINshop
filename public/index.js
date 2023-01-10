var product = [{
    id: 1,
    img: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNob2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    name: 'Nike',
    price: 7000,
    description: 'Nike Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, labore dolorum optio ad consequatur cupiditate!',
    type: 'shoe'
}, {
    id: 2,
    img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    name: 'Polaroid camera',
    price: 1500,
    description: 'Adidas shirt Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, labore dolorum optio ad consequatur cupiditate!',
    type: 'camera'
}, {
    id: 3,
    img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c2hvZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    name: 'Puma',
    price: 5000,
    description: 'Puma shoe Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, labore dolorum optio ad consequatur cupiditate!',
    type: 'shoe'
}, {
    id: 4,
    img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    name: 'Sun glasses',
    price: 500,
    description: 'Sun glasses Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, labore dolorum optio ad consequatur cupiditate!',
    type: 'glasses'
}, {
    id: 5,
    img: 'https://images.unsplash.com/photo-1614715838608-dd527c46231d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
    name: 'Glasses',
    price: 400,
    description: 'Glasses Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, labore dolorum optio ad consequatur cupiditate!',
    type: 'glasses'
}];

$(document).ready(() => {
    var html = '';
    for (let i = 0; i < product.length; i++) {
        html += `<div onclick="openProductDetail(${i})" class="product-item ${product[i].type}">
                    <img class="product-img" src="${product[i].img}" alt="">
                    <p style="font-size: 1.2vw;">${product[i].name}</p>
                    <p style="font-size: 0.9vw;">${numberWithCommas(product[i].price)} THB</p>
                </div>`;
    }
    $("#productlist").html(html);

})

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

function search(elem) {
    var value = $('#'+elem.id).val()
    //console.log(value)

    var html = '';
    for (let i = 0; i < product.length; i++) {
        if( product[i].name.includes(value) ) {//เช็คตัวอักษร
            html += `<div onclick="openProductDetail(${i})" class="product-item ${product[i].type}">
                        <img class="product-img" src="${product[i].img}" alt="">
                        <p style="font-size: 1.2vw;">${product[i].name}</p>
                        <p style="font-size: 0.9vw;">${numberWithCommas(product[i].price)} THB</p>
                    </div>`;
        }
    }
    if(html == '') {
        $("#productlist").html(`<p>Not found product</p>`);
    } else {
        $("#productlist").html(html);
    }

}

function searchproduct(searchlist) {
    console.log(searchlist)
    $(".product-item").css('display', 'none')
    if(searchlist == 'all') {
        $(".product-item").css('display', 'block')
    }
    else {
        $("."+searchlist).css('display', 'block')
    }
}

var productindex = 0;
function openProductDetail(index) {
    productindex = index;
    console.log(productindex)
    $("#modaldetail").css('display', 'flex')
    $("#mdd-img").attr('src', product[index].img);
    $("#mdd-name").text(product[index].name)
    $("#mdd-price").text( numberWithCommas(product[index].price) + ' THB')
    $("#mdd-desc").text(product[index].description)
}

function closemodal() {
    $(".modal").css('display','none')
}

var cart = [];
function addtocart() {
    var pass = true;

    for (let i = 0; i < cart.length; i++) {
        if( productindex == cart[i].index ) {
            console.log('found same product')
            cart[i].count++;
            pass = false;
        }
    }

    if(pass) {
        var obj = {
            index: productindex,
            id: product[productindex].id,
            name: product[productindex].name,
            price: product[productindex].price,
            img: product[productindex].img,
            count: 1
        };
        // console.log(obj)
        cart.push(obj)
    }
    //console.log(cart)
    Swal.fire({
        icon: 'success',
        title: 'Add ' + product[productindex].name + ' to cart !'
    })

    $("#cartcount").css('display','flex').text(cart.length)
}

function openCart() {
    $('#modalcart').css('display','flex')
    rendercart();
}

function rendercart() {
    if(cart.length > 0) {
        var html = '';
        for (let i = 0; i < cart.length; i++) {
            html += `                <div class="cartlist-item">
                        <div class="cartlist-left">
                            <img src="${cart[i].img}" alt="">
                            <div class="cartlist-detail">
                                <p style="font-size: 1.5vw;">${cart[i].name}</p>
                                <p style="font-size: 1.2vw;">${numberWithCommas(cart[i].price * cart[i].count)} THB</p>
                            </div>
                        </div>
                        <div class="cartlist-right">
                            <p onclick="deladd('-', ${i})" class="btnc">-</p>
                            <p id="countitems${i}" style="margin: 0 15px;">${cart[i].count}</p>
                            <p onclick="deladd('+', ${i})" class="btnc">+</p>
                        </div>
                    </div>`;
        }
        $("#mycart").html(html)
    }
    else {
        $("#mycart").html(`<p>Not found product list</p>`)
    }
}

function deladd(action, index) {
    if(action == '-') {
        if(cart[index].count > 0) {
            cart[index].count--;
            $("#countitems"+index).text(cart[index].count)

            if(cart[index].count <= 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Are you sure to delete?',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Delete',
                    cancelButtonText: 'Cancel'
                }).then((res) => {
                  if(res.isConfirmed) {
                     cart.splice(index, 1) 
                     //console.log(cart)
                     rendercart();
                     $("#cartcount").css('display','flex').text(cart.length)
                     
                     if(cart.length <= 0) {
                        $("#cartcount").css('display','none')
                     }
                  }  
                  else {
                    cart[index].count++;
                    $("#countitems"+index).text(cart[index].count)
                    rendercart();
                  }
                })
            }
            rendercart();
        }
        
    }
    else if(action == '+') {
        cart[index].count++;
        $("#countitems"+index).text(cart[index].count)
        rendercart();
    }
}