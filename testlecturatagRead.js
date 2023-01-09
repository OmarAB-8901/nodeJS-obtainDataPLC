// import tagsSBL from "./dataTags.js";

import fetch from "node-fetch";

let urlPLC = "http://127.0.0.1:1880/";

let testTagRead = async () => {

  let tagRead = { tag: "ns=3;s=[PLC_ANDON]FIFO_WC_OEE[0].Read", type: "Int32" };
  // let tagRead = {tag: "ns=3;s=[PLC_ANDON]FIFO_WC_Event[0].Read", type: "Int32"};

  let headers = {
    method: 'POST',
    body: JSON.stringify({ data: tagRead }),
    headers: {
      "content-type": "application/json; charset=utf-8"
    }
  };

  await fetch(urlPLC + "sbl_tags/subscribeTagData", headers);

  headers = {
    method: 'GET',
    headers: {
      "content-type": "application/json; charset=utf-8"
    }
  };

  let response = await fetch(urlPLC + "sbl_tags/readTagData?data=" + JSON.stringify(tagRead), headers).then(response => response.json()).then(data => data).catch(error => console.error(error));
  console.log(response);
}

let testTagByTag = () => {

  let groupTagsArray = Object.keys(tagsSBL).slice(0, 2);

  for (let tag in groupTagsArray) {
    console.log(tag, tagsSBL[tag]);
  }
}

let wrtiteTest = async () => {

  let tags = {
    tagsSBL: [
      { tag: "ns=3;s=[PLC_ANDON]BD_Entradas_OEE.Ready[1]", type: "Int32", value: 10 },
      { tag: "ns=3;s=[PLC_ANDON]BD_Entradas_OEE.Run[1]", type: "Int32", value: 10 },
      { tag: "ns=3;s=[PLC_W10]BD_Entradas_OEE.ICT[1]", type: "Int32", value: 500 },
      { tag: "ns=3;s=[PLC_ANDON]BD_Entradas_OEE.loteid[1]", type: "String", value: '123654' },
      { tag: "ns=3;s=[PLC_ANDON]BD_Entradas_OEE.parteid[1]", type: "String", value: 'P111' }
    ]
  }

  for (let tag of tags.tagsSBL) {

    let headers = {
      method: 'POST',
      body: JSON.stringify(tag),
      headers: {
        "content-type": "application/json; charset=utf-8"
      }
    };

    await fetch(urlPLC + "sbl_tags/writeTags", headers);
  }
}

// testTagRead();
// testTagByTag();
// wrtiteTest();


/** 
 * javascript comment 
 * @Author: Carlos Omar Anaya Barajas 
 * @Date: 2022-12-23 09:25:51 
 * @Desc:  
 */

import child_process from 'child_process';

let testResponseObject = async () => {

  try {
    let responseTest = await fetch("http://127.0.0.1:1880/sbl_tags/checkConn?data=1").then(json => json.json());
    console.log("Este es el test: ", responseTest);
  } catch (error) {
    // console.log( error.code );
    if(error.code === 'ECONNREFUSED'){

      // let comando = child_process.spawn('cmd', ['/c', 'D:\\Users\\LP-259\\AppData\\Roaming\\npm\\node-red.cmd']);
      let comando = child_process.spawn('cmd', ['/c', 'node-red']);
      comando.stdout.on('data', function(data){
        console.log( "Salida", data.toString() );
      });

      comando.stderr.on('data', function(data){
        console.warn( "Error:", data.toString() );
      });

      comando.on('exit', function(codigo){
        console.log( `Proceso ${codigo} terminado` );
      });
    }
  }
}

testResponseObject();