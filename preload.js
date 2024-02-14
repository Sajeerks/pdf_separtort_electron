/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */


const Toastify = require("toastify-js")







window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }





  
})

const { contextBridge , ipcRenderer} = require('electron')





  contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
    // we can also expose variables, not just functions
  })




contextBridge.exposeInMainWorld('electronApi', {

  getInputFilePathFunc:({inputFilepath,fileSeparatorDivisons})=>ipcRenderer.send("getinputfilepath", {inputFilepath,fileSeparatorDivisons}),
   
     

  GetVersion:(args)=>ipcRenderer.invoke("getversion",args ),
  // we can also expose variables, not just functions
})


contextBridge.exposeInMainWorld('Toastify', {
  toast :(options)=>Toastify(options).showToast()
   // we can also expose variables, not just functions
 })


//  contextBridge.exposeInMainWorld('ipcRenderer', {
//   send:(channel, data)=>ipcRenderer.send(channel, data),
//   on:(channel, func)=>ipcRenderer.on(channel, (event, ...args) =>func(...args))
//   // we can also expose variables, not just functions
// })