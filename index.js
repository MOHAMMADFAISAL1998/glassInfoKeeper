
// **************ComboBox Section******************

const pThickness = document.getElementById("pThickness");
const pThicknessList = document.getElementById("pThicknessList");
const pName = document.getElementById("pName");
const pNameList = document.getElementById("pNameList");

// ************pThickness-comboBox***************

pThickness.addEventListener("click", () => {
  pThicknessList.classList.toggle("show");
});

async function processThicknessFromJSON(){
    try{
        const data = await getJSONData();
        
        // ************pThickness-comboBox***************

        const uniqAllThick = [...new Set(data.map(i => i.iThickness))];
        
        for(let key in uniqAllThick){
            const thicknessLIST = document.createElement('li');
            thicknessLIST.textContent = uniqAllThick[key] + "MM";
            pThicknessList.append(thicknessLIST);
        }
        const itemThickness = pThicknessList.querySelectorAll("li");
        itemThickness.forEach((i) => {
            i.addEventListener("click", () => {
                pThickness.value = i.textContent;
                // console.log("Selected Value:", i.textContent); 
                pThicknessList.classList.remove("show");

                // ************pName-comboBox***************

                pNameList.innerHTML = '';
                
                const itemSort = data.filter((data)=>data.iThickness == (Number(i.textContent.slice(0, -2))));
                
                for(let key in itemSort){
                    const nameLIST = document.createElement('li');
                    nameLIST.textContent = itemSort[key].iName;
                    pNameList.append(nameLIST);
                }
                const itemName = pNameList.querySelectorAll("li");
                itemName.forEach((i) => {
                    i.addEventListener("click", () => {
                    pName.value = i.textContent;
                    pNameList.classList.remove("show");
                    // console.log("Selected Value:", i.textContent); 
                    });
                });
                // You can use this value as needed
            });
        });
    }
    catch(error){
        console.error('Failed to process data:',error);
    }
}
processThicknessFromJSON();

// Close dropdown if clicked outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".comboBoxPThickness")) {
    pThicknessList.classList.remove("show");
  }
});

// ************pName-comboBox***************

pName.addEventListener("click", () => {
  pNameList.classList.toggle("show");
});
   
// Close dropdown if clicked outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".comboBoxPName")) {
    pNameList.classList.remove("show");
  }
});

// **************ComboBox Section Closed******************

// *****************INSERT PRODUCT BUTTON*****************
let p_Thick = "";
let p_Name = "";

document.getElementById('btnProduct').addEventListener('click',(e) => {
    
    p_Thick = pThickness.value;
    p_Name = pName.value;
    
    console.log(pThickness.value + ' ' + pName.value);
    pThickness.value="";
    pName.value="";
});

// *******************************************************

document.getElementById('btnClear').addEventListener('click',(e) => {
    document.getElementById("calScr").value = null;
});

// ************Backspace Button****************

function applyBackspace(str)
{
    if(str.endsWith(" = ") || str.endsWith(" X "))
    {
        return str.substring(0, str.length - 3);
        //remove _X_ and _=_ at one Click.
    }
    else if(str.endsWith("/8"))
    {
	    if(str.endsWith("(1/2)/8"))
        {
		    if(str.endsWith(" (1/2)/8"))
            {
                return str.substring(0, str.length - 8);
                //remove _(1/2)/8 at one Click.
		    }
            else
            {
                return str.substring(0, str.length - 9);
                //remove n_(1/2)/8 at one Click.
            }
        }
	    else
        {
            return str.substring(0, str.length - 4);
            //remove _n/8 at one Click.
	    }
    }
    else
    {
        return str.substring(0, str.length - 1);
        //remove single Char at a Click.
    }

}

document.getElementById('btnBackspace').addEventListener('click',(e) => {
    
    let str = document.getElementById('calScr').value;
    let newStr = applyBackspace(str); 
    document.getElementById('calScr').value = newStr;
    console.log(newStr);
    
});

// ***********input Calci Button**************

const calciBtnContainer = document.getElementById('calciGrid');
calciBtnContainer.addEventListener('click',function(event){
    const button = event.target.closest('.btn-calci');
    if(!button)return;
    document.getElementById("calScr").value += `${button.textContent}`;
    // console.log(`Button Click! Text:"${button.textContent}"`);
});

// **********subBasicPart2 Button**********

document.getElementById('btnCross').addEventListener('click',(e) => {
document.getElementById("calScr").value += ` ${e.target.textContent} `;
});
document.getElementById('btnZero').addEventListener('click',(e) => {
document.getElementById("calScr").value += `${e.target.textContent}`;
});
document.getElementById('btnEqual').addEventListener('click',(e) => {
document.getElementById("calScr").value += ` ${e.target.textContent} `;
});


const sutToggleBtn = document.getElementById('sutPartToggleBtn'); 
let count = 0;
sutToggleBtn.addEventListener('click', function() {
    if(count == 0){
        document.getElementById('sutGrp').style.display = 'flex';
        count++;
    }else{
        document.getElementById('sutGrp').style.display = 'none';
        count--;
    }   
});

// ***********input Sut Button**************

const sutBtnGrp = document.querySelectorAll('.btn-Sut');
sutBtnGrp.forEach(btn => {
    btn.addEventListener('click',() => {
        const btnVal = btn.getAttribute('value');
        document.getElementById("calScr").value += btnVal;
        
    });
});

//************insertSize In Array***********
let arraySizeAndPieces = [];
document.getElementById('sizeInsBtn').addEventListener('click',(e) => {
    let str = document.getElementById('calScr').value;
    
    arraySizeAndPieces = sizeInArray(str);
    
    document.getElementById('calScr').value = null;
    // console.log(`${arraySizeAndPieces[0]}Inches ${arraySizeAndPieces[1]}Sut X ${arraySizeAndPieces[2]}Inches ${arraySizeAndPieces[3]}Sut = ${arraySizeAndPieces[4]}`);
});

function sizeInArray(str){

    //Regular Experations
    const _arr = str.split(/\s*[X=]\s*/);
    let pieces = _arr[2];

    const sizeArray = in_SutSeparation(_arr);
    sizeArray.push(pieces);
    return (sizeArray);    // Output
}

// ********saparate In. & Sut.************

function in_SutSeparation(arr){
    
    if(/\s/.test(arr[0])){
        if(/\s/.test(arr[1])){

            let sizeArray = [];
            
            sizeArray.push( arr[0].split(" ")[0], arr[0].split(" ")[1], arr[1].split(" ")[0], arr[1].split(" ")[1] );

            // console.log(`Length:${sizeArray[0]}In. ${sizeArray[1]}Sut. - Width:${sizeArray[2]}In. ${sizeArray[3]}Sut.`);
            return sizeArray;
        }
        else{
            let sizeArray = [];
            
            sizeArray.push( arr[0].split(" ")[0], arr[0].split(" ")[1], arr[1].split(" ")[0], null );

            // console.log(`Length:${sizeArray[0]}In. ${sizeArray[1]}Sut. - Width:${sizeArray[2]}In.`);
            return sizeArray;
        }
    }
    else if(/\s/.test(arr[1])){
        let sizeArray = [];

        sizeArray.push( arr[0].split(" ")[0], null ,arr[1].split(" ")[0], arr[1].split(" ")[1] );

        // console.log(`Length:${sizeArray[0]}In. - Width:${sizeArray[2]}In. ${sizeArray[3]}Sut.`);
        return sizeArray;
    }
    else{
        let sizeArray = [];

        sizeArray.push( arr[0].split(" ")[0], null ,arr[1].split(" ")[0], null );

        // console.log(`Length:${sizeArray[0]}In. - Width:${sizeArray[2]}In.`);
        return sizeArray;
    }
}

//************Farma Button***************
let farmaBool = false;
const btnFarma = document.getElementById('btnFarma');
btnFarma.addEventListener('click', () => {
    farmaBool = true;
    btnFarma.removeAttribute('class','btn');
    btnFarma.setAttribute('class','btnColorChange');
});

// ***************MOLDING SECTION******************

const btn_Mold = document.getElementById('btnMold');
const moldSec = document.querySelector('.moldDiv');
let moldInfo = {
    conners: [0, 0, 0, 0],
    edges: [0, 0, 0, 0],
    moldType: [null, null, null, null]
};

btn_Mold.addEventListener('click', (e) => {
    if (e.target.closest('.moldDiv')) 
        return;
    
    moldSec.classList.toggle("showMolding");     //Toggle
});
document.addEventListener('click', (e) => {
    if (!btn_Mold.contains(e.target)) {
        moldSec.classList.remove('showMolding');
    }
});
moldSec.addEventListener('click', (e) => {
    e.stopPropagation();
});

const moldDesign = document.querySelectorAll('.sm');
moldDesign.forEach(btn => {
    btn.addEventListener('click',() => {
        const btnVal = btn.getAttribute('value');
        
        moldEdgeConner(btnVal);

        const moldDesign = document.querySelectorAll('.eadgeM');
            moldDesign.forEach(btn => {
                btn.style.pointerEvents = 'none';
                btn.style.backgroundColor = 'gray';
            });

        // console.log("hello: "+btnVal);    
        //Output: topLeft,top,topRight,left,right,bottomLeft,bottom,bottomRight
        
    });
});

function moldEdgeConner(value){
    const square = document.querySelector('.moldFig');
    if(value == "top"){
        moldInfo.edges[0] = 1;
        moldInfo.moldType[0] = selectedMoldingType;
        square.style.borderTop = '4px solid red';
    }
    if(value == "bottom"){
        moldInfo.edges[2] = 1;
        moldInfo.moldType[2] = selectedMoldingType;
        square.style.borderBottom = '4px solid red';
    }
    if(value == "left"){
        moldInfo.edges[3] = 1;
        moldInfo.moldType[3] = selectedMoldingType;
        square.style.borderLeft = '4px solid red';
    }
    if(value == "right"){
        moldInfo.edges[1] = 1;
        moldInfo.moldType[1] = selectedMoldingType;
        square.style.borderRight = '4px solid red';
    }
    
    if(value == "topLeft"){
        moldInfo.conners[0] = 1;
        square.style.borderTopLeftRadius = '20px';
    }
    if(value == "topRight"){
        moldInfo.conners[1] = 1;
        square.style.borderTopRightRadius = '20px';
    }
    if(value == "bottomRight"){
        moldInfo.conners[2] = 1;
        square.style.borderBottomRightRadius = '20px';
    }
    if(value == "bottomLeft"){
        moldInfo.conners[3] = 1;
        square.style.borderBottomLeftRadius = '20px';
    }
    if(value == "mainFig"){
        square.style.border = '2px solid black';
        square.style.borderRadius = '0px 0px 0px 0px';
        moldInfo = {conners:[0,0,0,0],edges:[0,0,0,0],moldType:[null,null,null,null]};
    }
}

let selectedMoldingType = '';
const menuBtn = document.querySelectorAll('.moldMenuBtn');
menuBtn.forEach(menuName => {
    menuName.addEventListener('click', (e) =>{
            selectedMoldingType = e.target.value;
            // console.log("MoldingType:" + selectedMoldingType);    
            // Selected Radio Button / Selected Molding Type

            const moldDesign = document.querySelectorAll('.eadgeM');
            moldDesign.forEach(btn => {
                btn.style.pointerEvents = 'auto';
                btn.style.backgroundColor = 'blueviolet';
                // console.log(btn);
            });
    });
});

//********Molding Cancel Button*************

const moldCancelBtn = document.querySelector('.moldCancel');
moldCancelBtn.addEventListener('click', () => {
    moldSec.classList.remove('showMolding');
});

let deepCopyMoldInfo = {};
let moldSelectBool = false;
const moldSelectBtn = document.querySelector('.moldSelect');
moldSelectBtn.addEventListener('click', () => {
    moldSelectBool = true;
    // console.log(moldInfo.conners);
    // console.log(moldInfo.edges);
    // console.log(moldInfo.moldType);
    deepCopyMoldInfo = JSON.parse(JSON.stringify(moldInfo)); // Deep copy

    //Default State
    const square = document.querySelector('.moldFig');
    square.style.border = '2px solid black';
    square.style.borderRadius = '0 0 0 0';
    moldInfo = {conners:[0,0,0,0],edges:[0,0,0,0],moldType:[null,null,null,null]};
    moldSec.classList.remove('showMolding');
});

// *************************************************************

// **************INSERT PRODUCT & THICKNESS*********************

// *************************************************************

let glassGRP = null;

document.getElementById('btnProduct').addEventListener('click', () => {
    // Create the root container
    const glassGroup = document.createElement('div');
    glassGroup.className = 'glass-group';
    glassGRP=glassGroup;

    // Build inner structure
    const oitemNameDiv = document.createElement('div');
    oitemNameDiv.className = 'oitemNameDiv';

    const oheader = document.createElement('div');
    oheader.className = 'oheader';

    // First title group (Thickness + Name)
    const otitle1 = document.createElement('div');
    otitle1.className = 'otitle';
    
    const thicknessH3 = document.createElement('h3');
    thicknessH3.className = 'oThicknessH3';
    thicknessH3.textContent = p_Thick;
    
    const nameH3 = document.createElement('h3');
    nameH3.className = 'oP_Name';
    nameH3.textContent = p_Name;
    
    otitle1.append(thicknessH3, nameH3);

    // Second title group (Labels)
    const otitle2 = document.createElement('div');
    otitle2.className = 'otitle';
    
    const label1 = document.createElement('div');
    label1.className = 'olabels';
    label1.textContent = 'Length';
    
    const label2 = document.createElement('div');
    label2.className = 'olabels';
    label2.textContent = 'Width';
    
    const label3 = document.createElement('div');
    label3.className = 'olabels';
    label3.textContent = 'Pieces';
    
    otitle2.append(label1, label2, label3);

    // Assemble header
    oheader.append(otitle1, otitle2);

    // Delete button section
    const deleteBox = document.createElement('div');
    deleteBox.className = 'deleteBox';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'odelete-btn';
    // deleteBtn.innerHTML = '🗑️'; // Emoji for delete
    deleteBtn.innerHTML = '<img src="image/binClose.png" alt="" class="dustImg">';
    
    deleteBtn.addEventListener('click', function() {
        glassGroup.remove(); // Remove the entire group on click
    });
    
    deleteBox.appendChild(deleteBtn);

    // Final structure assembly
    oitemNameDiv.append(oheader, deleteBox);
    glassGroup.appendChild(oitemNameDiv);

    // Add to container in DOM
    document.getElementById('outputArea').appendChild(glassGroup);
});

// *************************************************************

// ***********************INSERT SIZE***************************

// *************************************************************

document.getElementById('sizeInsBtn').addEventListener('click', () => {
    // Create the root container
    // const glassGroup = document.createElement('div');
    // glassGroup.className = 'glass-group';

    // Build inner structure
    const oitemDiv = document.createElement('div');
    oitemDiv.className = 'oitemDiv';

    const oSizeMolding = document.createElement('div');
    oSizeMolding.className = 'oSizeMolding';

    // First title group (Thickness + Name)
    const otitle1 = document.createElement('div');
    otitle1.className = 'oSize';

    const input1 = document.createElement('div');
    input1.className = 'input';
    if(arraySizeAndPieces[1] != null){
        input1.textContent = arraySizeAndPieces[0] +" "+ arraySizeAndPieces[1] +" ";
    }
    else{
        input1.textContent = arraySizeAndPieces[0] +" ";
    }

    const operatorX = document.createElement('div');
    operatorX.className = 'operator';
    operatorX.textContent = 'X';

    const input2 = document.createElement('div');
    input2.className = 'input';
    if(arraySizeAndPieces[3] != null){
        input2.textContent = arraySizeAndPieces[2] +" "+ arraySizeAndPieces[3] +" ";
    }
    else{
        input2.textContent = arraySizeAndPieces[2] +" ";
    }
    
    const operatorEq = document.createElement('div');
    operatorEq.className = 'operator';
    operatorEq.textContent = ' => ';

    const input3 = document.createElement('div');
    input3.className = 'input';
    input3.textContent = arraySizeAndPieces[4];

    
    //            FARMA Section
    if(!farmaBool)
    {
        const farma = document.createElement('div');
        farma.className = 'farma';
        farma.textContent = '';
        otitle1.append(input1, operatorX, input2, operatorEq, input3);
    }
    else{
        const farma = document.createElement('div');
        farma.className = 'farma';
        farma.textContent = '(F)';
        otitle1.append(farma, input1, operatorX, input2, operatorEq, input3);
        btnFarma.removeAttribute('class','btnColorChange');
        btnFarma.setAttribute('class','btn');
        farmaBool = false;
    }
  
    //************MOLDING Value Section********************

    if(moldSelectBool == true){

        const otitle2 = document.createElement('div');
        otitle2.className = 'oMolding';

        const oEdgesPara = document.createElement('p');
        oEdgesPara.className = 'oEdges';
        oEdgesPara.textContent = 'Edges:';
        const oConnersPara = document.createElement('p');
        oConnersPara.className = 'oConners';
        oConnersPara.textContent = 'Conner:';
        
        function setMoldingConnerValue(deepCopyMoldInfo,oConnersPara,oEdgesPara){
            for(let i=0; i<4; i++){
                if(deepCopyMoldInfo.conners[i] != 0){
                    
                    if(i == 0){
                        const oConner = document.createElement('span');
                        oConner.className = 'connerSpan';    
                        oConner.textContent += "Top Left";   //Value in Span
                        oConnersPara.append(oConner);
                    }
                    if(i == 1){
                        const oConner = document.createElement('span');
                        oConner.className = 'connerSpan';    
                        oConner.textContent += "Top Right";   //Value in Span
                        oConnersPara.append(oConner);
                    }
                    if(i == 2){
                        const oConner = document.createElement('span');
                        oConner.className = 'connerSpan';    
                        oConner.textContent += "Bottom Right";   //Value in Span
                        oConnersPara.append(oConner);
                    }
                    if(i == 3){
                        const oConner = document.createElement('span');
                        oConner.className = 'connerSpan';    
                        oConner.textContent += "Bottom Left";   //Value in Span
                        oConnersPara.append(oConner);
                    }       
                }
                
                if(deepCopyMoldInfo.edges[i] != 0){
                    
                    if(i == 0 && deepCopyMoldInfo.moldType[i] != null){
                        const oEdge = document.createElement('span');
                        oEdge.className = 'edgeSpan';
                        oEdge.textContent += "Top:"+deepCopyMoldInfo.moldType[0]+" ";   //Value in Span
                        oEdgesPara.append(oEdge);
                    }
                        
                    if(i == 1 && deepCopyMoldInfo.moldType[i] != null){
                        const oEdge = document.createElement('span');
                        oEdge.className = 'edgeSpan';
                        oEdge.textContent += "Right:"+deepCopyMoldInfo.moldType[1]+" ";   //Value in Span
                        oEdgesPara.append(oEdge);
                    }
                        
                    if(i == 2 && deepCopyMoldInfo.moldType[i] != null){                
                        const oEdge = document.createElement('span');
                        oEdge.className = 'edgeSpan';
                        oEdge.textContent += "Bottom:"+deepCopyMoldInfo.moldType[2]+" ";   //Value in Span
                        oEdgesPara.append(oEdge);
                    }
                        
                    if(i == 3 && deepCopyMoldInfo.moldType[i] != null){  
                        const oEdge = document.createElement('span');              
                        oEdge.className = 'edgeSpan';
                        oEdge.textContent += "Left:"+deepCopyMoldInfo.moldType[3]+" ";   //Value in Span
                        oEdgesPara.append(oEdge);
                    }      
                }
            }
        }

        setMoldingConnerValue(deepCopyMoldInfo,oConnersPara,oEdgesPara);
        deepCopyMoldInfo={conners:[0,0,0,0],edges:[0,0,0,0],moldType:[null,null,null,null]};
        
        otitle2.append(oEdgesPara, oConnersPara);
        // Assemble header
        oSizeMolding.append(otitle1, otitle2);
        moldSelectBool = false;
    }
    else{
        oSizeMolding.append(otitle1);
    }

    //*************DESIGN Value Section*******************

    
    if(designerTriggar){
        const oDesignPara = document.createElement('p');
        oDesignPara.className = 'oDesign';
        oDesignPara.textContent = 'Design: ';
        const oDesignCategory = document.createElement('span');
        oDesignCategory.className = 'designCategorySpan';

        designCategoryReq.forEach(selectedCat => {
            oDesignCategory.textContent += selectedCat + " ";
        });
        designCategoryReq=[];
        oDesignPara.append(oDesignCategory);
    
        if(designSimple > 0){
            
            const oDesign = document.createElement('span');
            oDesign.className = 'designSpan';    
            oDesign.textContent += "Sample Design";   //Value in Span
            oDesignPara.append(oDesign);
            oSizeMolding.append(oDesignPara);
            // Final structure assembly
            oitemDiv.append(oSizeMolding);

            glassGRP.appendChild(oitemDiv); //CHECK THIS
            designSimple = 0;
        }else{
            const oDesign = document.createElement('span');
            oDesign.className = 'designSpan';
            for(let key in designFileInfo){
                oDesign.textContent += ' Design Name: ' + designFileInfo[key] + ' Size: ' + designFileInfo[++key] + 'Bytes';
                
                key = key + 2;
            }
            designFileInfo = [];    
            //Value in Span
            oDesignPara.append(oDesign);
            oSizeMolding.append(oDesignPara);
            // Final structure assembly
            oitemDiv.append(oSizeMolding);

            glassGRP.appendChild(oitemDiv); //CHECK THIS
        }
        designerTriggar = false;
    }

    //**************** Hole & Notch Section *********************** */

    // holeInfo = [{}];        //Object in array form 
    if(treggarHole)
    {
        // Create the holeDiv container
        const holeDiv = document.createElement('div');
        holeDiv.className = 'holeDiv';
    
        // Create the heading
        const heading = document.createElement('h3');
        heading.textContent = 'Hole Information';
        holeDiv.appendChild(heading);
    
        // Create the table
        const table = document.createElement('table');
        table.id = 'hole-table';
    
        // Create the table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
    
        const headers = ['Quantity', 'Size', 'Position'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
    
        thead.appendChild(headerRow);
        table.appendChild(thead);
    
        // Create the table body
        const tbody = document.createElement('tbody');
        table.appendChild(tbody);
    
        // Add table to the container
        holeDiv.appendChild(table);
    
        // Create the footer paragraph
        const footer = document.createElement('p');
        footer.className = 'footer';
        footer.textContent = 'All measurements are in millimeters (MM), inches (in) and soot (sut)';
        holeDiv.appendChild(footer);
    
        // Add the holeDiv to the p tag
        const oHolePara = document.createElement('p');
        oHolePara.className = 'oHole';
        oHolePara.textContent = 'Hole: ';
        oHolePara.append(holeDiv);


        oSizeMolding.append(oHolePara);
        // Final structure assembly
        oitemDiv.append(oSizeMolding);

        glassGRP.appendChild(oitemDiv);

        generateTable();
        treggarHole = false;
    }
    if(treggarNotch)
    {
        // notchInfo = [{}];
        // Create the holeDiv container
        const notchDiv = document.createElement('div');
        notchDiv.className = 'notchDiv';
        // Create the heading
        const heading = document.createElement('h3');
        heading.textContent = 'Notch Information:';
        notchDiv.appendChild(heading);

        const notchContainer = document.createElement('div');
        notchContainer.id = 'notch-container';
        
        notchInfo.forEach((notch, index) => {
            const box = document.createElement("div");
            box.className = "notch-box";

            // Create wheel
            const wheel = document.createElement("div");
            wheel.className = "wheel";

            const sliceData = [
                { class: "shape", label: "Shape", value: notch.shape },
                { class: "position", label: "Position", value: notch.position },
                { class: "depth", label: "Depth", value: notch.depth },
                { class: "distance", label: "Distance_Length", value: notch.distanceLength },
                { class: "notch", label: "Notch_Length", value: notch.notchLength }
            ];

            sliceData.forEach(data => {
                const slice = document.createElement("div");
                slice.className = `slice ${data.class}`;
                slice.innerHTML = `<div class="nInnerVal">${data.value}</div>`;
                wheel.appendChild(slice);

                const label = document.createElement("div");
                // label.className = "label";
                // console.log(data.label);
                label.classList.add("label",data.label);
                label.textContent = data.label;
                box.appendChild(label);
            });

            box.appendChild(wheel);

            const title = document.createElement("div");
            title.className = "notch-title";
            title.textContent = `Notch ${index + 1}`;
            box.appendChild(title);

            notchContainer.appendChild(box);
        });

        notchDiv.appendChild(notchContainer);


        // Add the holeDiv to the p tag
        const oNotchPara = document.createElement('p');
        oNotchPara.className = 'oNotch';
        oNotchPara.textContent = 'Notch: ';
        oNotchPara.append(notchDiv);

        oSizeMolding.append(oNotchPara);
        // Final structure assembly
        oitemDiv.append(oSizeMolding);

        glassGRP.appendChild(oitemDiv);
        treggarNotch = false;
    }

    // Delete button section
    const delItemBox = document.createElement('div');
    delItemBox.className = 'delItemBox';
    
    const oDelItem_btn = document.createElement('button');
    oDelItem_btn.className = 'oDelItem-btn';
    // oDelItem_btn.innerHTML = '🗑️';
    oDelItem_btn.innerHTML = '<img src="image/binClose.png" alt="" class="dustImg">';
    
    delItemBox.addEventListener('click', function() {
        oitemDiv.remove(); // Remove the entire group on click
    });
    
    delItemBox.appendChild(oDelItem_btn);

    // Final structure assembly
    oitemDiv.append(oSizeMolding, delItemBox);

    glassGRP.appendChild(oitemDiv); //CHECK THIS

    

});    

// ***********************DESIGNING SECTION***************************

const btnDesign = document.querySelector('.btn-design');
const designSection = document.getElementById('designSection');

// Toggle design Section visibility
btnDesign.addEventListener("click", () => {
    designSection.classList.toggle("showdesign");
});
// Close design Section when clicking outside
document.addEventListener("click", (e) => {
    const isClickInside = btnDesign.contains(e.target);
    if(!isClickInside && designSection.classList.contains("showdesign")) {
        designSection.classList.remove("showdesign");
    }
});
// Prevent design Section close when interacting with its contents
designSection.addEventListener("click",(e) => {
    e.stopPropagation();
});

//Design Category Section
const designCategory = document.querySelectorAll('.designCat');
designCategory.forEach(item => {
    item.addEventListener("click", (e) => {
        e.target.classList.toggle("selecteddesignCategory");
    });       
});

// Handle sample button
const btnSimpleDesign = document.querySelector('.btnDesignSample');
let designSimple = 0;

btnSimpleDesign.addEventListener("click", () => {
    designSimple++;
    console.log(designSimple);
});

// Handle submit button
const designFile = document.getElementById('designUpload');
const designSubmit = document.getElementById('btnDesignSubmit');
let designCategoryReq = [];
let designFileInfo = [];
let designerTriggar = false;
designSubmit.addEventListener("click", () =>{
    const selectedDesignCategory = document.querySelectorAll('.selecteddesignCategory');
    selectedDesignCategory.forEach(selectedCategory => {
        // console.log(selectedCategory.textContent);
        designCategoryReq.push(selectedCategory.textContent);
        console.log(designCategoryReq);
    });
    if(designSimple > 0){
        designerTriggar = true;
        console.log("Submitted with sample count:", designSimple);
        // designSimple = 0;
        console.log(designSimple);
    }else{
        designerTriggar = true;
        if(designFile.files.length > 0){
            Array.from(designFile.files).forEach(file =>{
                designFileInfo.push(`${file.name}`);
                designFileInfo.push(`${file.size}`);
                
                console.log(`File: ${file.name}, Size: ${file.size} bytes`);
            });
            
        }else{
            designerTriggar = false;
            console.log('No files selected');
        }
    }

    designCategory.forEach(item => {
        item.classList.remove("selecteddesignCategory");
    });       

    designSection.classList.remove("showdesign");
});

// ***********************HOLE & NOTCH SECTION***************************

const hNgSection = document.querySelector('.holeNbookingSection');
const btnHole = document.getElementById("btnHole");

btnHole.addEventListener("click", () => {
    hNgSection.classList.toggle('showDiv');
});
// Close hNg Section when clicking outside
document.addEventListener("click", (e) => {
    const isClickInside = btnHole.contains(e.target);
    if(!isClickInside && hNgSection.classList.contains("showDiv")) {
        hNgSection.classList.remove("showDiv");
    }
});
// Prevent hNg Section close when interacting with its contents
hNgSection.addEventListener("click", (e) => {
    e.stopPropagation();
});

const holeBtn = document.querySelector('#holeInputBtn');
const notchBtn = document.querySelector('#notchInputBtn');

function createHoleDetail(){
    // Create main container
    const mainContainer = document.createElement('div');
    mainContainer.className = 'holeSectionSubMain';

    // Create hole size section
    const sizeSection = document.createElement('div');
    sizeSection.className = 'holeSizeSection';

    // Create size heading
    const sizeHeading = document.createElement('div');
    sizeHeading.className = 'holeSizeHeading';
    const sizeSpan = document.createElement('span');
    sizeSpan.textContent = 'Size:';
    sizeHeading.appendChild(sizeSpan);

    // Create size values with tooltips
    const sizeValues = [
        { value: '5', tooltip: ' 1.5 Soot' },
        { value: '6', tooltip: ' 1.89 Soot' },
        { value: '8', tooltip: ' 2.5 Soot' },
        { value: '10', tooltip: ' 3.15 Soot' },
        { value: '12', tooltip: ' 3.78 Soot' },
        { value: '63.5', tooltip: ' 2.5 Inch' }
    ];

    sizeSection.appendChild(sizeHeading);
    
    sizeValues.forEach(item => {
        const sizeVal = document.createElement('div');
        sizeVal.className = 'sizeVal';
        sizeVal.textContent = item.value;
  
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltiptext';
        tooltip.textContent = item.tooltip;
  
        sizeVal.appendChild(tooltip);
        sizeSection.appendChild(sizeVal);
    });

    // Create hole position container
    const positionContainer = document.createElement('div');
    positionContainer.className = 'holePosSection';

    // Create position heading
    const positionHeading = document.createElement('div');
    positionHeading.className = 'holePosHeading';
    const posSpan = document.createElement('span');
    posSpan.textContent = 'Position:';
    positionHeading.appendChild(posSpan);

    // Create position description
    const positionDesc = document.createElement('div');
    positionDesc.className = 'holePosTitle';
    const posDescSpan = document.createElement('span');
    posDescSpan.classList.add('holePosDescSpan');
    posDescSpan.innerHTML = 'Top-Bottom &nbsp; Left-Right';
    positionDesc.appendChild(posDescSpan);
    positionContainer.appendChild(positionHeading);
    positionContainer.appendChild(positionDesc);

    // Create input fields container
    const inputContainer = document.createElement('div');
    inputContainer.className = 'holePosMain';

    // Create input fields
    const inputFields = [
        { name: 'top', id: 'holePosTop' },
        { name: 'bottom', id: 'holePosBottom' },
        { name: 'Left', id: 'holePosLeft' },
        { name: 'Right', id: 'holePosRight' }
    ];

    inputFields.forEach(field => {
        const input = document.createElement('input');
        input.type = 'text';
        input.name = field.name;
        input.id = field.id;
        input.className = 'txtPosMain';
        inputContainer.appendChild(input);
    });

    // Assemble all components
    positionContainer.appendChild(inputContainer);
    mainContainer.appendChild(sizeSection);
    mainContainer.appendChild(positionContainer);

    // Final structure assembly
    const holeSectionMain = document.querySelector('.holeSectionMain');
    holeSectionMain.appendChild(mainContainer);
}


let holeCount = 0;

holeBtn.addEventListener("click", () => {
    const numHole = document.querySelector('#txtHole');
    const holeSectionMain = document.querySelector('.holeSectionMain');
    holeCount = Number(numHole.value);
    holeSectionMain.innerHTML = "";
    
    for(let i=0 ; i<holeCount ; i++){
        
        createHoleDetail();

    }
    const holeSizeVal = document.querySelectorAll(".sizeVal");
    holeSizeVal.forEach(item => {
        // console.log(item.textContent);
        item.addEventListener("click", () => {
                
            item.classList.toggle('sizeValActive');
                // console.log(item);
        }); 
    });

});

function holeInfoData(){
    // holeCount = 0;
    const arrPos = document.querySelectorAll('.txtPosMain');
    const activeSize = document.querySelectorAll('.sizeValActive')
    let sizeHoleArr = [];
    activeSize.forEach(size => {
        sizeHoleArr.push(size.innerText);
    });
    // console.log(sizeHoleArr);
    // const sizeHoleArr = ["5","6","4"];
    
    let posHoleArr = [];
    arrPos.forEach(pos => {
        posHoleArr.push(pos.value);
        
    });
    // console.log(posHoleArr);
    // const posHoleArr = ["1in","","2in","","1in","","","3in","","1.5in","2in",""];
        

    // Split posHoleArr into chunks of 4 elements each
    const chunks = [];
    for (let i = 0; i < posHoleArr.length; i += 4) {
        chunks.push(posHoleArr.slice(i, i + 4));
    }

    // Map each chunk to the object structure
    const tempHoleInfo = chunks.map((chunk, index) => ({
        size: sizeHoleArr[index],
        position: [
            { top: chunk[0], bottom: chunk[1] },  
            // First two values: top, bottom
            { left: chunk[2], right: chunk[3] }   
            // Last two values: left, right
        ]
    }));
    
    // console.log(tempHoleInfo);
    return tempHoleInfo;
    
}



function createNotchDetail(){
    
    // Create sub-main container
    const notchSubMain = document.createElement('div');
    notchSubMain.className = 'notchSectionSubMain';

    // Create input field groups
    const inputs = [
        { label: 'Shape:', id: 'txtNotchShape' },
        { label: 'Position:', id: 'txtNotchPos' },
        { label: 'Depth:', id: 'txtNotchDepth' },
        { label: 'Notch Length:', id: 'txtNotchLength' },
        { label: 'Distance Length:', id: 'txtNotchDistanceLength' }
    ];

    // Create each input group and add to sub-main container
    inputs.forEach(input => {

        const notchSubMainPart = document.createElement('div');
        notchSubMainPart.className = 'notchSectionSubMainPart';
    
        const span = document.createElement('span');
        span.textContent = input.label;
    
        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.id = input.id;
        textInput.className = 'txtNotch';
    
        notchSubMainPart.appendChild(span);
        notchSubMainPart.appendChild(textInput);
        notchSubMain.appendChild(notchSubMainPart);
    });
    
    const notchSectionMain = document.querySelector('.notchSectionMain');
    // Assemble final structure
    notchSectionMain.appendChild(notchSubMain);
}

let notchCount = 0;
notchBtn.addEventListener("click", () => {
    const numNotch = document.querySelector('#txtNotch');
    const notchSectionMain = document.querySelector('.notchSectionMain');
    notchCount = Number(numNotch.value);
    notchSectionMain.innerHTML = "";

    for(let i=0 ; i<notchCount ; i++){
        console.log(notchCount);

        createNotchDetail();

    }
});


function notchInfoData(){
    // holeCount = 0;
    const arrNotch = document.querySelectorAll('.txtNotch');
    
    let posNotchArr = [];
    arrNotch.forEach(pos => {
        posNotchArr.push(pos.value);
        
    });
    // return posNotchArr;
    // const posNotchArr = ['11', '12', '13', '14', '21', '22', '23', '24'];
        
    // Split posHoleArr into chunks of 4 elements each
    const chunks = [];
    for (let i = 0; i < posNotchArr.length; i += 5) {
        chunks.push(posNotchArr.slice(i, i + 5));
    }

    // Map each chunk to the object structure
    const tempNotchInfo = chunks.map(chunk => ({

        shape: chunk[0],
        position: chunk[1],
        depth: chunk[2], 
        notchLength: chunk[3],
        distanceLength: chunk[4]  
        // four values: shape, position, depth, notchLength, totalLength.
        
    }));
    
    // console.log(tempNotchInfo);
    return tempNotchInfo;   
}


let holeInfo = [{}];        //Object in array form
let notchInfo = [{}];
let treggarHole, treggarNotch;        
const hNbSelectBtn = document.querySelector(".hNbSelectBtn");
hNbSelectBtn.addEventListener('click', () => {
    if(holeCount > 0){
        treggarHole = true;
    }else{
        treggarHole = false;
    }
    holeInfo = holeInfoData();
    console.log(holeInfo);

    if(notchCount > 0){
        treggarNotch = true;
    }else{
        treggarNotch = false;
    }
    notchInfo = notchInfoData();
    console.log(notchInfo);

    hNbClearVal();

    hNgSection.classList.remove("showDiv");
});

function hNbClearVal(){
    document.querySelector('#txtHole').value = "";
    document.querySelector('#txtNotch').value = "";
    const holeSectionMain = document.querySelector('.holeSectionMain');
    holeSectionMain.innerHTML = "";
    const notchSectionMain = document.querySelector('.notchSectionMain');
    notchSectionMain.innerHTML = "";
}
const hNbCancelBtn = document.querySelector(".hNbCancelBtn");
hNbCancelBtn.addEventListener('click', () => {
    if(hNgSection.classList.contains("showDiv")) {
        hNgSection.classList.remove("showDiv");
    }
    // holeInfo = [{}];
    // notchInfo = [{}];
    holeCount = 0;
    notchCount = 0;
    treggarHole = false;
    treggarNotch = false;
});

// Function to generate the table rows
function generateTable() {
    const tbody = document.querySelector('#hole-table tbody');
            
    holeInfo.forEach((hole, index) => {
        const row = document.createElement('tr');
                
        // Quantity cell
        const quantityCell = document.createElement('td');
        quantityCell.textContent = `Hole ${index + 1}`;
        row.appendChild(quantityCell);
                
        // Size cell
        const sizeCell = document.createElement('td');
        sizeCell.textContent = `${hole.size}MM`;
        sizeCell.className = 'size-cell';
        row.appendChild(sizeCell);
                
        // Position cell
        const positionCell = document.createElement('td');
        positionCell.className = 'position-cell';
                
        // Process position data
        const vertical = hole.position[0];
        const horizontal = hole.position[1];
                
        // Create position tags
        if (vertical.top) {
                const topTag = document.createElement('span');
                topTag.textContent = `Top(${vertical.top})`;
                topTag.className = 'position-tag';
                positionCell.appendChild(topTag);
        }
                
        if (vertical.bottom) {
                const bottomTag = document.createElement('span');
                bottomTag.textContent = `Bottom(${vertical.bottom})`;
                bottomTag.className = 'position-tag';
                positionCell.appendChild(bottomTag);
        }
                
        if (horizontal.left) {
                const leftTag = document.createElement('span');
                leftTag.textContent = `Left(${horizontal.left})`;
                leftTag.className = 'position-tag';
                positionCell.appendChild(leftTag);
        }
                
        if (horizontal.right) {
                const rightTag = document.createElement('span');
                rightTag.textContent = `Right(${horizontal.right})`;
                rightTag.className = 'position-tag';
                positionCell.appendChild(rightTag);
        }
                
        row.appendChild(positionCell);
        tbody.appendChild(row);
    });
}

// ***********************HOLE & NOTCH SECTION END***************************