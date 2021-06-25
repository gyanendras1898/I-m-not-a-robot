const imgContainer = document.querySelector("#image-container");
const src = [
  "https://cdn.pixabay.com/photo/2017/01/08/13/58/cube-1963036__340.jpg",
  "https://cdn.pixabay.com/photo/2016/09/08/18/45/cube-1655118__340.jpg",
  "https://cdn.pixabay.com/photo/2013/07/13/10/21/rubiks-cube-157058__340.png",
  "https://cdn.pixabay.com/photo/2014/06/27/22/38/magic-cube-378543__340.jpg",
  "https://cdn.pixabay.com/photo/2017/07/06/06/12/rubik-2477165__340.jpg",
];
const img = [];
let selectedImg = [];
for (let i = 0; i < 5; i++) {
  var im = document.createElement("img");
  im.src = src[i];
  im.setAttribute("data-ns-test", "img" + (i + 1));
  //im.value = "img" + (i + 1);
  im.onclick = function () {
    select(this);
  };
  img.push(im);
}
let x = Math.floor(Math.random() * 5);
var dupIm = document.createElement("img");
dupIm.src = src[x];
dupIm.setAttribute("data-ns-test", "img" + (x + 1));
//dupIm.value = "img" + (x + 1);
//console.log(dupIm.value);
dupIm.onclick = function () {
  select(this);
};

img.push(dupIm);
var msg;
var selectedImgCount = 0;

const generate = () => {
  for (let i = 0; i < 6; i++) {
    x = Math.floor(Math.random() * 6);
    var temp = img[x];
    img[x] = img[i];
    img[i] = temp;
  }
  for (let i = 0; i < 6; i++) imgContainer.appendChild(img[i]);
  msg = document.createElement("h3");
  msg.innerHTML =
    "Please click on the identical tiles to verify that you are not a robot";
  document.body.appendChild(msg);
};
generate();

// console.log(dupIm.getAttribute("data-ns-test"));

var reset = document.createElement("button");
reset.id = "reset";
reset.innerHTML = "Reset";
reset.onclick = function () {
  reset.style.display = "none";
  varify.style.display = "none";
  para.innerHTML = "";
  generate();
  selectedImgCount = 0;
  for (let ele of selectedImg) {
    // console.log(ele.style.border);
    ele.style.border = "";
  }
  selectedImg = [];
};
reset.style.display = "none";
document.body.appendChild(reset);

var para = document.createElement("p");
para.id = "para";

var varify = document.createElement("button");
varify.id = "btn";
varify.innerHTML = "Verify";
varify.onclick = function () {
  varify.style.display = "none";

  var check = document.querySelectorAll(
    "[data-ns-test= " + dupIm.getAttribute("data-ns-test") + "]"
  );
  if (
    check[0].style.border == check[1].style.border &&
    check[0].style.border == "5px solid"
  ) {
    para.innerHTML = "You are a human. Congratulations!";
  } else {
    para.innerHTML =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

  document.body.appendChild(para);
};
varify.style.display = "none";
document.body.appendChild(varify);

const select = (image) => {
  if (image.style.border != "5px solid") {
    image.style.border = "5px solid";
    msg.innerHTML = "";
    reset.style.display = "block";
    selectedImg.push(image);
    selectedImgCount++;
    if (selectedImgCount == 2) varify.style.display = "block";
    else varify.style.display = "none";
  }
};
