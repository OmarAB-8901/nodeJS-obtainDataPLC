/** 
 * javascript comment 
 * @Author: Carlos Omar Anaya Barajas 
 * @Date: 2022-07-26 08:49:09 
 * @Desc: This file use callback functions to subscribe the tags to the PLC. 
 */

let urlPLC = "http://127.0.0.1:1880/";

import fetch from "node-fetch";
import tagsSBL from "./dataTags.js";

let groupTagsArray = Object.keys(tagsSBL).slice(0, 3);
let groupTagsArrayToSubscribe = Object.keys(tagsSBL);
let groupTagsArrayAnalogicas = Object.keys(tagsSBL.analogicas);

async function subscribeDataTags(tagData, n = 0) {

  try {
    
    if (n == tagData.length)
      return;

    let headers = {
      method: 'POST',
      body: JSON.stringify( { data: tagData[n] } ),
      headers: { "content-type": "application/json; charset=utf-8" }
    };
    
    await fetch(urlPLC + "sbl_tags/subscribeTagData", headers);

    return subscribeDataTags(tagData, n + 1);
  } catch (error) {
    console.log(error);
  }
}

async function readDataTags(tagData, n = 0, dataReaded = []) {

  try {
    
    if (n == tagData.length)
      return dataReaded;

    let headers = {
      method: 'GET',
      headers: { "content-type": "application/json; charset=utf-8" }
    };

    dataReaded.push(await fetch(urlPLC + "sbl_tags/readTagData?data=" + JSON.stringify(tagData[n]), headers).then(response => response.json()).then(data => data.data ?? 0).catch(error => console.error(error)));
    // dataReaded.push(await fetch(urlPLC + "sbl_tags/readTagData?data=" + JSON.stringify(tagData[n]), headers).then(response => response.json()).then(data => data.data).catch(error => console.error(error)));

    return readDataTags(tagData, n + 1, dataReaded);
  } catch (error) {
    console.log(error);
  }
}

async function sendDataToDB(dataReaded, group) {

  try {
    
    let headers = {
      method: 'POST',
      body: JSON.stringify({ procecedData: dataReaded, group: group }),
      headers: { "content-type": "application/json; charset=utf-8" }
    };
  
    fetch(urlPLC + "sbl_tags/saveTagData", headers).then(json => json.json()).then(data => data).catch(error => console.error(error));
  
    return;
  } catch (error) {
    console.log( error );
  }
}

(async () => {
  
  for (let t of groupTagsArrayToSubscribe) {

    if (t !== 'analogicas')
      await subscribeDataTags(tagsSBL[t]);
    else {
      for (let ta of groupTagsArrayAnalogicas)
        await subscribeDataTags(tagsSBL[t][ta]);
    }
  }
  
  console.log( tagsSBL );
  console.log("\n|*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-|-Tags Subscribeds-|-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*|\n");
 })();

let obtainAndSaveData = async (tags, t) => {

  let dataReaded = await readDataTags(tags);
  await sendDataToDB(dataReaded, t);
}

setInterval(async () => {
  
  for (let t of groupTagsArray) {
    if (t !== 'analogicas')
      await obtainAndSaveData(tagsSBL[t], t);
    else {
      for (let ta of groupTagsArrayAnalogicas)
        await obtainAndSaveData(tagsSBL[t][ta], t);
    }
  }
}, 2100);

setInterval(async () => {

  try {
    
    let dateJS = new Date();
    let newDate = `${dateJS.getFullYear()}-${dateJS.getMonth()+1 < 10 ? `0${dateJS.getMonth()+1}` : dateJS.getMonth()+1}-${dateJS.getDate() < 10 ? `0${dateJS.getDate()}` : dateJS.getDate()}`;
    newDate += ` ${dateJS.getHours() < 10 ? `0${dateJS.getHours()}` : dateJS.getHours()}:${dateJS.getMinutes() < 10 ? `0${dateJS.getMinutes()}` : dateJS.getMinutes()}:${dateJS.getSeconds() < 10 ? `0${dateJS.getSeconds()}` : dateJS.getSeconds()}.${dateJS.getMilliseconds()}`

    let dates = [
      {tag: "ns=3;s=[PLC_ANDON]From_server_String", type: "String", value: newDate},
      {tag: "ns=3;s=[PLC_ANDON]Write_date_from_server", type: "Int32", value: 1},
    ];

    for( let dTag of dates ){
      
      let headers = { 
        method: 'POST',
        body: JSON.stringify(dTag),
        headers: { "content-type": "application/json; charset=utf-8" }
      };
  
      await fetch(urlPLC + "sbl_tags/writeTags", headers).then(json => json.json()).then(data => data).catch(error => console.error(error));
    }
    
  } catch (error) {
    console.log(error);
  }
}, 300000);

setTimeout(async () => {
  
  setInterval(async () => {

    try {

      let tx = [ {tag: "ns=3;s=[PLC_ANDON]wachdog_server_tx", type: "Int32", value: 1} ];
    
      for( let dTag of tx ){
        
        let headers = { 
          method: 'POST',
          body: JSON.stringify(dTag),
          headers: { "content-type": "application/json; charset=utf-8" }
        };
    
        await fetch(urlPLC + "sbl_tags/writeTags", headers).then(json => json.json()).then(data => data).catch(error => console.error(error));
      }
  
      let headers = { 
        method: 'GET',
        headers: {    
          "content-type": "application/json; charset=utf-8"
        }
      };
  
      let tagRX = await fetch(urlPLC + "sbl_tags/readWatchDogRX?data="+JSON.stringify({tag: "ns=3;s=[PLC_ANDON]wachdog_server_rx", type: "Int32"}), headers).then(json => json.json()).then(data => data).catch(error => console.error(error));
      
      if(tagRX.data){
    
        let rx = [ {tag: "ns=3;s=[PLC_ANDON]wachdog_server_rx", type: "Int32", value: 0} ];
      
        for( let dTag of rx ){
          
          let headers = { 
            method: 'POST',
            body: JSON.stringify(dTag),
            headers: { "content-type": "application/json; charset=utf-8" }
          };
      
          setTimeout(async () => {
            await fetch(urlPLC + "sbl_tags/writeTags", headers).then(json => json.json()).then(data => data).catch(error => console.error(error));
          }, 2000);
        }
      }
    } catch (error) {
      console.error("Error en proceso watch dog:", error );
    }
  
  }, 1000);

}, 5000);
