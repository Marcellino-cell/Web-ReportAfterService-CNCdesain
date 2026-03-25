// ================= TOGGLE ICON =================
function toggleCondition(icon){
if(icon.classList.contains("bad")){
icon.classList.remove("fa-circle-xmark","bad")
icon.classList.add("fa-circle-check","good")
}else{
icon.classList.remove("fa-circle-check","good")
icon.classList.add("fa-circle-xmark","bad")
}
}

// ================= ENCODER =================
function updateEncoderMeasurement(){

let type = document.getElementById("encoderType").value
let measurement = document.getElementById("encoderMeasurement")

measurement.innerHTML=""

if(type==="encoder"){
measurement.innerHTML=`
<option value="">Select</option>
<option>Encoder can detect</option>
<option>Encoder can't detect</option>`
}

if(type==="resolver"){
measurement.innerHTML=`
<option value="">Select</option>
<option>Resolver can detect</option>
<option>Resolver can't detect</option>`
}

}

// ================= ACTION INFO =================
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
if(value==="housingFront") text="Housing Bearing Recondition"
if(value==="housingRear") text="Housing Bearing Recondition"
if(value==="seal") text="Seal Replaced"

infoCell.innerText=text

}

// ================= ADD ACTION =================
function addAction(){

let table=document.getElementById("actionTable")

let row=table.insertRow()

row.innerHTML=`
<td>
<select onchange="updateActionInfo(this)">
<option value="">Select Action</option>
<option value="cleaning">Cleaning Motor</option>
<option value="bearing">Replacement bearing</option>
<option value="align">Alignment Encoder</option>
<option value="encoder">Encoder replacement</option>
<option value="brake">Brake Replacement</option>
<option value="smi">SMI Replacement</option>
<option value="housingFront">Housing Front</option>
<option value="housingRear">Housing Rear</option>
<option value="seal">Seal Replacement</option>
</select>
</td>

<td class="conditionCell">
<i class="fa-solid fa-circle-xmark conditionIcon bad" onclick="toggleCondition(this)"></i>
</td>

<td class="infoCell"></td>
`

}

// ================= REMOVE ACTION =================
function removeLastAction(){
let table = document.getElementById("actionTable")
if(table.rows.length > 2){
table.deleteRow(table.rows.length - 1)
}
}

// ================= OPTION =================
function applyRowOption(){

let brake = document.getElementById("optBrake")?.checked
let smi = document.getElementById("optSMI")?.checked
let type = document.getElementById("optType")?.checked
let note = document.getElementById("includeNote")?.checked

document.getElementById("rowBrake").style.display = brake ? "" : "none"
document.getElementById("rowSMI").style.display = smi ? "" : "none"
document.getElementById("rowType").style.display = type ? "" : "none"
document.getElementById("additionalNoteSection").style.display = note ? "block" : "none"

}

// ================= PDF =================
async function downloadPDF(){

applyRowOption()

const { jsPDF } = window.jspdf
let report = document.getElementById("report")
let buttons = document.querySelectorAll(".noPrint")

buttons.forEach(b => b.style.display = "none")

try{
const canvas = await html2canvas(report,{scale:2,useCORS:true})
const imgData = canvas.toDataURL("image/png")

const pdf = new jsPDF("p","mm","a4")

pdf.addImage(imgData,'PNG',0,0,210,297)
pdf.save("CNC_Report.pdf")

}finally{
buttons.forEach(b => b.style.display = "inline-block")
}

}

// ================= SIGNATURE =================
function initSignature(){

const canvas = document.getElementById("signature")
const ctx = canvas.getContext("2d")

let drawing = false

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

canvas.addEventListener("mousedown", e=>{
drawing=true
let p=getPos(e)
ctx.beginPath()
ctx.moveTo(p.x,p.y)
})

canvas.addEventListener("mousemove", e=>{
if(!drawing) return
let p=getPos(e)
ctx.lineTo(p.x,p.y)
ctx.stroke()
})

canvas.addEventListener("mouseup", ()=>drawing=false)
canvas.addEventListener("mouseleave", ()=>drawing=false)

canvas.addEventListener("touchstart", e=>{
drawing=true
let p=getPos(e)
ctx.beginPath()
ctx.moveTo(p.x,p.y)
})

canvas.addEventListener("touchmove", e=>{
if(!drawing) return
e.preventDefault()
let p=getPos(e)
ctx.lineTo(p.x,p.y)
ctx.stroke()
})

canvas.addEventListener("touchend", ()=>drawing=false)

}

// ================= CLEAR SIGN =================
function clearSignature(){
const canvas = document.getElementById("signature")
canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height)
}

// ================= LOAD =================
window.addEventListener("load", ()=>{

let today=new Date().toISOString().split('T')[0]

document.getElementById("date").value = today
document.getElementById("dateBottom").value = today
document.getElementById("csr").value = "CSR-"+Date.now()

applyRowOption()
initSignature()

})
