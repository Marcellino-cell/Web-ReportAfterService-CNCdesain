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

window.onload=function(){

let today=new Date().toISOString().split('T')[0]

document.getElementById("date").value=today
document.getElementById("dateBottom").value=today

document.getElementById("csr").value="CSR-"+Date.now()

document.getElementById("optBrake").addEventListener("change",applyRowOption)
document.getElementById("optSMI").addEventListener("change",applyRowOption)
document.getElementById("optType").addEventListener("change",applyRowOption)

applyRowOption()

initSignature()

}

function updateActionInfo(select){

let infoCell = select.parentElement.parentElement.querySelector(".infoCell")
let value = select.value
let text = ""

if(value==="cleaning") text="Motor has been cleaned"
if(value==="bearing") text="Bearing has been replaced"
if(value==="align") text="Motor has been alignmented"
if(value==="encoder") text="Encoder replaced"
if(value==="brake") text="Brake replaced"
if(value==="smi") text="SMI Replaced"
if(value==="housingFront") text="Housing Bearing has been Recondition"
if(value==="housingRear") text="Housing Bearing has been Recondition"
if(value==="seal") text="Seal Replaced"

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
<option value="bearing">Replacement bearing front and rear</option>
<option value="align">Alignment Encoder</option>
<option value="encoder">Encoder replacement</option>
<option value="brake">Brake Replacement</option>
<option value="smi">SMI Replacement</option>
<option value="housingFront">Housing Bearing (Front) Recondition</option>
<option value="housingRear">Housing Bearing (Rear) Recondition</option>
<option value="seal">Seal Replacement</option>

</select>

</td>

<td class="conditionCell">
<i class="fa-solid fa-circle-xmark conditionIcon bad" onclick="toggleCondition(this)"></i>
</td>

<td class="infoCell"></td>

`

}

function removeLastAction(){

let table = document.getElementById("actionTable")
let rowCount = table.rows.length

if(rowCount > 2){
table.deleteRow(rowCount - 1)
}

}

async function downloadPDF(){

applyRowOption()

const { jsPDF } = window.jspdf

let report = document.getElementById("report")

let buttons = document.querySelectorAll(".noPrint")
buttons.forEach(b => b.style.display = "none")

const canvas = await html2canvas(report,{scale:2})

const imgData = canvas.toDataURL("image/png")

const pdf = new jsPDF("p","mm","a4")

const imgWidth = 210
const pageHeight = 297

const imgHeight = canvas.height * imgWidth / canvas.width
let heightLeft = imgHeight

let position = 0

pdf.addImage(imgData,'PNG',0,position,imgWidth,imgHeight)

heightLeft -= pageHeight

while(heightLeft > 0){

position = heightLeft - imgHeight
pdf.addPage()
pdf.addImage(imgData,'PNG',0,position,imgWidth,imgHeight)

heightLeft -= pageHeight

}

pdf.save("CNC_Service_Report.pdf")

buttons.forEach(b => b.style.display = "inline-block")

}

function applyRowOption(){

let brake = document.getElementById("optBrake").checked
let smi = document.getElementById("optSMI").checked
let type = document.getElementById("optType").checked

document.getElementById("rowBrake").style.display = brake ? "" : "none"
document.getElementById("rowSMI").style.display = smi ? "" : "none"
document.getElementById("rowType").style.display = type ? "" : "none"

}

function initSignature(){

const canvas = document.getElementById("signature")
const ctx = canvas.getContext("2d")

let drawing = false

ctx.lineWidth = 2
ctx.lineCap = "round"
ctx.lineJoin = "round"

function getPos(e){

let rect = canvas.getBoundingClientRect()

if(e.touches){
return {
x: e.touches[0].clientX - rect.left,
y: e.touches[0].clientY - rect.top
}
}else{
return {
x: e.clientX - rect.left,
y: e.clientY - rect.top
}
}

}

function startDraw(e){
drawing = true
let pos = getPos(e)
ctx.beginPath()
ctx.moveTo(pos.x,pos.y)
}

function draw(e){

if(!drawing) return

e.preventDefault()

let pos = getPos(e)

ctx.lineTo(pos.x,pos.y)
ctx.stroke()

}

function endDraw(){
drawing = false
ctx.beginPath()
}

canvas.addEventListener("mousedown", startDraw)
canvas.addEventListener("mousemove", draw)
canvas.addEventListener("mouseup", endDraw)
canvas.addEventListener("mouseleave", endDraw)

canvas.addEventListener("touchstart", startDraw)
canvas.addEventListener("touchmove", draw)
canvas.addEventListener("touchend", endDraw)

}

function clearSignature(){

const canvas = document.getElementById("signature")
const ctx = canvas.getContext("2d")

ctx.clearRect(0,0,canvas.width,canvas.height)

}

<h3 class="section" id="actionTitle">ACTION REPORT</h3>
