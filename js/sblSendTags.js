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

setInterval(async () => {
  
  let readTagSaveData;

  for (let t of groupTagsArray) {
    
    if (t !== 'analogicas'){
      
      readTagSaveData = await readDataTags( [tagsSBL[t][0]] );

      if(readTagSaveData.data){

        let dataReaded = await readDataTags(tagsSBL[t]);
        await sendDataToDB(dataReaded, t);
      }
    }
  }
}, 6000);