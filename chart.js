const chart = document.querySelector('.chart');
const canvas = document.createElement("canvas");
canvas.width = 50;
canvas.height = 50;
chart.appendChild(canvas);
const ctx = canvas.getContext("2d");
ctx.lineWidth = 9;

const R = 20;
function draw(color, ratio, anticlockwise){
ctx.strokeStyle = color;
ctx.beginPath();
ctx.arc(canvas.width/2, canvas.height/2, R, 0, ratio*2*Math.PI, anticlockwise);
ctx.stroke();

}


draw('#FFF',0.5,false);

function updateChart(income,outcome){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  let ratio = income / (income+outcome);
  draw('#F0624D', - ratio, true);
  draw('#FFFFFF', 1-ratio, false);


}
