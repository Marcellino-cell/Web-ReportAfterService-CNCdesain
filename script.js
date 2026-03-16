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
canvas.addEventListener("mouseup",()=>{
drawing=false
ctx.beginPath()
})

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

applyRowOption()

}

document.getElementById("date").addEventListener("change",function(){

document.getElementById("dateBottom").value=this.value

})

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
async function downloadPDF(){

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

pdf.addImage(imgData,'PNG',0,0,imgWidth,imgHeight)

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

function clearSignature(){

const canvas = document.getElementById("signature")
const ctx = canvas.getContext("2d")

ctx.clearRect(0,0,canvas.width,canvas.height)

}

function applyRowOption(){

let brake = document.getElementById("optBrake").checked
let smi = document.getElementById("optSMI").checked
let type = document.getElementById("optType").checked

document.getElementById("rowBrake").style.display = brake ? "" : "none"
document.getElementById("rowSMI").style.display = smi ? "" : "none"
document.getElementById("rowType").style.display = type ? "" : "none"

}

function printReport(){

applyRowOption()
window.print()

}

function removeLastAction(){

let table = document.getElementById("actionTable")

if(table.rows.length > 2){
table.deleteRow(table.rows.length - 1)
}

}
