let AddBtn = document.querySelectorAll(".add-to-cart");
import axios from "axios";
import noty from "noty";

let cartCounter = document.querySelector("#cart-counter");
const UpdateCart = (pizza) => {
  axios
    .post("/updateCart", pizza)
    .then((res) => {
      // console.log(res);
      cartCounter.innerText = res.data.totalQnt;
      new noty({
        type : "success",
        timeout : 1000,
        text: "Products add SuccessFully",
        layout : "topRight"
      }).show();

    })
    .catch((e) => {
      new noty({
        type : "error",
        timeout : 1000,
        text: "something went wrong",
        layout : "topRight"
      }).show();
      console.log(e);
    });
};

AddBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    UpdateCart(pizza);
  });
});
