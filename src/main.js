const {BrowserWindow, Notification, Menu, app} = require('electron')
const {getConnection} = require('./database')
const url = require('url')
const path = require('path');

async function createProduct(product){
    const conn = await getConnection();
    //product.price = parseFloat(product.price)
    const result = await conn.query('INSERT INTO product set ?', product)
    console.log(result);

    new Notification({
        title: 'Electron Mysql',
        body: 'New Product Has Been Added',
    }).show();

    product.id = result.insertId;
    return product;

}

async function getProducts(){
    const conn = await getConnection();
    const results = await conn.query('SELECT * FROM product ORDER BY id DESC')
    //console.log(results)
    return results;
}

async function deleteProduct(id){
    const conn = await getConnection();
    const result = await conn.query('DELETE FROM product WHERE id = ?', id);
    console.log(result)
    return result;
}

async function getProductById(id){
    const conn = await getConnection();
    const results = await conn.query('SELECT * FROM product WHERE id = ?', id);
    return results[0];
}

async function updateProduct(id, product){
    const conn = await getConnection();
    const results = await conn.query('UPDATE product SET ? WHERE id = ?', [product, id]);
    console.log(results)
}

//creacion de la ventana
let window;
let newProductWindow;
let updateWin;
let deleteWin;
let createWin;

require('electron-reload')(__dirname,{
    electron: path.join(__dirname, '../node_modules', '.bin', 'electron' )
})


app.on('ready', () => {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
            nodeIntegrationInWorker: true,
            enableRemoteModule: true
        }
    })
    window.loadFile('src/ui/index.html');

    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);
    window.webContents.openDevTools();
    window.on('closed', () =>{
        app.quit();
    })
})
/*
function createWindow(){
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
            nodeIntegrationInWorker: true,
            enableRemoteModule: true
        }
    })
    window.loadFile('src/ui/index.html');

    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);

    window.on('closed', () =>{
        app.quit();
    })
}
*/
function createProductWindow(){
    newProductWindow = new BrowserWindow({
        width: 500,
        height: 500,
        title: 'CRUD',
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
            nodeIntegrationInWorker: true,
            enableRemoteModule: true
        }
    });
    newProductWindow.setMenu(null);
    newProductWindow.loadFile('src/ui/crud.html');
    newProductWindow.webContents.openDevTools();
    newProductWindow.on('closed', () => {
        newProductWindow=null;
        window.reload();
    })
}

function updateWindow(){
    updateWin = new BrowserWindow({
        width: 500,
        height: 500,
        title: 'CRUD',
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
            nodeIntegrationInWorker: true,
            enableRemoteModule: true
        }
    });
    updateWin.setMenu(null);
    updateWin.loadFile('src/ui/update.html');
    updateWin.webContents.openDevTools();
    updateWin.on('closed', () => {
        updateWin=null;
        window.reload();
    })
}

function deleteWindow(){
    deleteWin = new BrowserWindow({
        width: 500,
        height: 500,
        title: 'CRUD',
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
            nodeIntegrationInWorker: true,
            enableRemoteModule: true
        }
    });
    deleteWin.setMenu(null);
    deleteWin.loadFile('src/ui/delete.html');
    deleteWin.webContents.openDevTools();
    deleteWin.on('closed', () => {
        deleteWin=null;
        window.reload();
    })
}

function createWindow(){
    createWin = new BrowserWindow({
        width: 500,
        height: 500,
        title: 'CRUD',
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
            nodeIntegrationInWorker: true,
            enableRemoteModule: true
        }
    });
    createWin.setMenu(null);
    createWin.loadFile('src/ui/create.html');
    createWin.webContents.openDevTools();
    createWin.on('closed', () => {
        createWin=null;
        window.reload();
    })
}

const templateMenu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'CRUD',
                accelerator: 'Ctrl+G',
                click(){
                    createProductWindow();
                }
            },
            {
                label: 'Create',
                accelerator: 'Ctrl+N',
                click(){
                    createWindow();
                }
            },
            {
                label: 'Update',
                accelerator: 'Ctrl+U',
                click(){
                    updateWindow();
                }
            },
            {
                label: 'Delete',
                accelerator: 'Ctrl+D',
                click(){
                    deleteWindow();
                }
            },
            {
                label: 'Exit',
                accelerator: 'Ctrl+S',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

if(process.platform === 'darwin') {
    templateMenu.unshift({
        label: app.getName()
    })
}


module.exports = {
   //createWindow,
    createProduct,
    getProducts,
    deleteProduct,
    getProductById,
    updateProduct,
}