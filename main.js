// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain,shell } = require('electron')
const path = require('node:path')

const os = require("os")
const fs = require("fs")

let anslength
const { PDFDocument, StandardFonts, rgb } =require(  'pdf-lib')
let mainWindow
function createWindow () {
  // Create the browser window.
   mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'judo.ico'),
    webPreferences: {
      nodeIntegration:true,
      
      contextIsolation:true,
     
      preload: path.join(__dirname, 'preload.js')
    }
  })
  // mainWindow.webContents.openDevTools(),
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}



ipcMain.on('getinputfilepath',async (event, args) => {
  // console.log("event== getinputfilepath==",event);
  // console.log("args==getinputfilepath==",args);

// console.log("args in getinputfilepath==", args);
await delayaer(args)
// await separtedPDFS( args)



});





// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.



async function separtedPDFS(args) {
let fileSeparatorDivisons = args.fileSeparatorDivisons
let inputFilepath = args.inputFilepath
// fileSeparatorDivisons = fileSeparatorDivisons.replaceAll(" ","")

try {




  console.log("ssssssssssssssssssss");
  // console.log(fileSeparatorDivisons);
  // console.log(inputFilepath);
  const existingPdfBytes = await fs.readFileSync(inputFilepath)
  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  // console.log("pdfDoc--",pdfDoc);
  const pages = pdfDoc.getPages()
  console.log("numner of pdf pages  :",pages.length)
  const lastpage = pages.length-1

let fileSeparatorArray = fileSeparatorDivisons.split(",")
console.log("fileSeparatorArray--",fileSeparatorArray);
 
if(fileSeparatorArray.length%2!==0){
  anslength=null
  throw Error("not a valid array")
  
}



let pageNoArrayNameArray = []

// let maxLengthHalfOFArray = Math.round( fileSeparatorArray.length/2)
// console.log({maxLengthHalfOFArray});
console.log("fileSeparatorArray.length==", fileSeparatorArray.length);
anslength =fileSeparatorArray.length
for (let i = 0; i < fileSeparatorArray.length; i++) {

  // if( ! (!isNaN(parseInt(fileSeparatorArray[i])) && isFinite(fileSeparatorArray[i]))  ){
  //   anslength=null
  //   throw Error("not a valid page number")
  // }


  if(i%2===0){
    // pageNoArrayNameArray.push([fileSeparatorArray[i], fileSeparatorArray[i+1]])

    if( ! (!isNaN(parseInt(fileSeparatorArray[i])) && isFinite(fileSeparatorArray[i]))  ){
      anslength=null
      throw Error("not a valid page number")
    }
   }

  if(anslength ===null){
    
    break
  }

  // console.log("fileSeparatorArray[i]--",fileSeparatorArray[i]);
  // console.log("i===",i);
  // console.log("fileSeparatorArray[i+1]--",fileSeparatorArray[i+1]);
 if(i%2===0){
  pageNoArrayNameArray.push([fileSeparatorArray[i].replaceAll(" ",""), fileSeparatorArray[i+1]])
 }
 
  
}

// console.log("ccccccccccccccccccc");
console.log(pageNoArrayNameArray);

for (let i = 0; i < pageNoArrayNameArray.length; i++) {
  const pdfDoc2 = await PDFDocument.create()
  let filename =""
  let coumpunder = 0
  coumpunder = i===0?0:Number(pageNoArrayNameArray[i-1][0])
// console.log({coumpunder});
  for (let j = coumpunder; j <pageNoArrayNameArray[i][0] ; j++) {
   
    //  console.log("j=======",j);
    //  console.log("pageNoArrayNameArray[i][0]==",pageNoArrayNameArray[i][0]);
    filename = pageNoArrayNameArray[i][1]
    const [firstDonorPage] = await pdfDoc2.copyPages(pdfDoc, [j])
    pdfDoc2.addPage(firstDonorPage)

  }
  // console.log("vvvvvvvvvvvvvvvvvvvvvv");
  // const pdfBytes = await pdfDoc2.save()
  fs.writeFile( path.dirname(inputFilepath )  +"//"+filename+'.pdf', await pdfDoc2.save(),(err) => {
    if (err)
        console.log(err);
    else {
        // console.log("mater file writing completed\n");
        // console.log("The written has the following contents:");


        // let win = new BrowserWindow({
        //                 webPreferences: {
        //                   plugins: true
        //                 }
        //               })
        
        //               win.loadURL( direcmaster+"//"+"FINAL"+'--output.pdf')
  

        
    }
    })

    if(anslength ===null){
    
      return
    }

}
  
  
} catch (error) {
  console.log(error);
}




// mainWindow.webContents.send("image:done")


setTimeout(() => {
shell.openPath(path.dirname(inputFilepath ))
  
}, 2000);



}

async function delayaer(args){
  // console.log(args);
 await separtedPDFS(args)
}


ipcMain.handle('getversion',async (event, args) => {
  console.log("event== get/version==",event);
  console.log("args==get/version==",args);
  await delayaer(args)


   return anslength
});