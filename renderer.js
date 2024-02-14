/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */


const uploadInput =document.getElementById("uploadInput")
const nameListInput =document.getElementById("story")




uploadInput.addEventListener("change",async (e)=>{

     const inputFile = e.target.files[0]
    //  console.log({inputFile});
     const inputFilepath = inputFile.path
 
      let fileSeparatorDivisons = nameListInput.value
      // fileSeparatorDivisons = fileSeparatorDivisons.replaceAll(" ","").replace(/\n|\r/g, "");
      // fileSeparatorDivisons = fileSeparatorDivisons

     console.log({fileSeparatorDivisons});
if(inputFilepath &&  fileSeparatorDivisons!==""){
// console.log(window.electronApi);
   window.electronApi.getInputFilePathFunc({inputFilepath, fileSeparatorDivisons})

}else{
    alertError('Please enter a inputFilepath and fileSeparatorDivisons');
uploadInput.value =""

    return
}



let version = await window.electronApi.GetVersion({inputFilepath, fileSeparatorDivisons})


console.log("version in render", version);
if(version){
  alertSuccess(` ${version/2} no of files separated `)
}else{
  alertError('Please enter valid a inputFilepath and fileSeparatorDivisons');
}
nameListInput.value =""
uploadInput.value =""
})

console.log(window.electronApi);





// ipcRenderer.on("image:done", ()=>{
//     alertSuccess("PDF splitting completed")
//   })



// console.log("window.electronApi==",window.electronApi);









// console.log(versions.node());












function alertSuccess(message) {
    Toastify.toast({
      text: message,
      duration: 5000,
      close: false,
      style: {
        background: 'green',
        color: 'white',
        textAlign: 'center',
      },
    });
  }
  
  function alertError(message) {
    Toastify.toast({
      text: message,
      duration: 5000,
      close: false,
      style: {
        background: 'red',
        color: 'white',
        textAlign: 'center',
      },
    });
  }
  