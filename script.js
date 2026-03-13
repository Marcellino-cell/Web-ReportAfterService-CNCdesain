function toggleCondition(icon){

if(icon.classList.contains("bad")){

icon.classList.remove("fa-circle-xmark","bad")
icon.classList.add("fa-circle-check","good")

}else{

icon.classList.remove("fa-circle-check","good")
icon.classList.add("fa-circle-xmark","bad")

}

}



function updateEncoderMeasurement(){

let type=document.getElementById("encoderType").value
let measurement=document.getElementById("encoderMeasurement")

measurement.innerHTML=""

if(type==="encoder"){

measurement.innerHTML=`

<option value="">Select</option>
<option>Encoder can detect</option>
<option>Encoder can't detect</option>

`

}

if(type==="resolver"){

measurement.innerHTML=`

<option value="">Select</option>
<option>Resolver can detect</option>
<option>Resolver can't detect</option>

`

}

}



const canvas=document.getElementById("signature")
const ctx=canvas.getContext("2d")

let drawing=false

canvas.addEventListener("mousedown",()=>drawing=true)
canvas.addEventListener("mouseup",()=>drawing=false)

canvas.addEventListener("mousemove",(e)=>{

if(!drawing) return

ctx.lineWidth=2
ctx.lineCap="round"

ctx.lineTo(e.offsetX,e.offsetY)
ctx.stroke()

ctx.beginPath()
ctx.moveTo(e.offsetX,e.offsetY)

})


window.onload=function(){

let today=new Date().toISOString().split('T')[0]

document.getElementById("date").value=today
document.getElementById("dateBottom").value=today

document.getElementById("csr").value="CSR-"+Date.now()

toggleBrakeSection()

}



document.getElementById("date").addEventListener("change",function(){

document.getElementById("dateBottom").value=this.value

})

function updateActionInfo(select){

let infoCell = select.parentElement.parentElement.querySelector(".infoCell")
let value = select.value
let text = ""

if(value==="cleaning"){
text="Motor has Cleaned"
}

if(value==="front"){
text="Bearing has been replacemented"
}

if(value==="back"){
text="Bearing has been replacemented"
}

if(value==="align"){
text="Motor has been alignmented"
}

infoCell.innerText=text

}



function addAction(){

let table=document.getElementById("actionTable")

let row=table.insertRow()

row.innerHTML=`

<td>
<select onchange="updateActionInfo(this)">
<option value="">Select Action</option>
<option value="cleaning">Cleaning Motor</option>
<option value="front">Replacement Front Bearing</option>
<option value="back">Replacement Back Bearing</option>
<option value="align">Alignment Encoder</option>
</select>
</td>

<td class="conditionCell">
<i class="fa-solid fa-circle-xmark conditionIcon bad" onclick="toggleCondition(this)"></i>
</td>

<td class="infoCell"></td>

`

}



async function downloadPDF(){

const { jsPDF } = window.jspdf

let report = document.getElementById("report")
let buttons = document.querySelectorAll(".noPrint")

buttons.forEach(b => b.style.display = "none")

const canvas = await html2canvas(report,{scale:2})

const imgData = canvas.toDataURL("image/png")

const pdf = new jsPDF("p","mm","a4")

const pdfWidth = 210
const pdfHeight = 297

const imgWidth = canvas.width
const imgHeight = canvas.height

const ratio = Math.min(pdfWidth/imgWidth , pdfHeight/imgHeight)

const newWidth = imgWidth * ratio
const newHeight = imgHeight * ratio

const marginX = (pdfWidth - newWidth) / 2
const marginY = (pdfHeight - newHeight) / 2

pdf.addImage(imgData,"PNG",marginX,marginY,newWidth,newHeight)

pdf.save("CNC_Service_Report.pdf")

buttons.forEach(b => b.style.display = "inline-block")

}

function sendEmail(){

let csr = document.getElementById("csr").value
let date = document.getElementById("date").value

let customer = document.querySelector("input[name='customer']")?.value || ""
let address = document.querySelector("input[name='address']")?.value || ""

let templateParams = {

csr: csr,
date: date,
customer: customer,
address: address

}

emailjs.send("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",templateParams)

.then(function(response){

alert("Report berhasil dikirim ke Gmail")

}, function(error){

alert("Gagal mengirim email")

})

}

function sendEmail(){

let csr = document.getElementById("csr").value
let date = document.getElementById("date").value

let customer = document.querySelector("input[name='customer']")?.value || ""
let address = document.querySelector("input[name='address']")?.value || ""

let templateParams = {

csr: csr,
date: date,
customer: customer,
address: address

}

emailjs.send("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",templateParams)

.then(function(response){

alert("Report berhasil dikirim ke Gmail")

}, function(error){

alert("Gagal mengirim email")

})

function toggleBrakeSection(){

let value = document.getElementById("motorBrakeSelect").value

let smiRow = document.getElementById("smiRow")
let encoderRow = document.getElementById("encoderRow")

if(value === "no"){

smiRow.style.display = "none"
encoderRow.style.display = "none"

}else{

smiRow.style.display = "table-row"
encoderRow.style.display = "table-row"

}

}

function toggleBrakeSection(){

let value = document.getElementById("motorBrakeSelect").value

let smiRow = document.getElementById("smiRow")
let encoderRow = document.getElementById("encoderRow")

if(value === "no"){

smiRow.style.display = "none"
encoderRow.style.display = "none"

}else if(value === "yes"){

smiRow.style.display = "table-row"
encoderRow.style.display = "table-row"

}else{

smiRow.style.display = "none"
encoderRow.style.display = "none"

}

}

}


