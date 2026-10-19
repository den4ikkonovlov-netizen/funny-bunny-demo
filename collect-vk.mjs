import fs from 'node:fs/promises';
import path from 'node:path';

const assetDir=path.resolve('dist/assets/vk');
await fs.mkdir(assetDir,{recursive:true});
const headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0 Safari/537.36'};
const albumHtml=await (await fetch('https://vk.com/album-212936868_310145163',{headers})).text();
const albumIds=[...new Set([...albumHtml.matchAll(/photo-212936868_(\d+)/g)].map(match=>match[1]))];
const recentIds=Array.from({length:121},(_,i)=>String(457246580+i));
const ids=[...new Set([...albumIds,...recentIds])];
const results=JSON.parse(await fs.readFile('vk-photos.json','utf8').catch(()=> '[]'));
let next=0;
async function worker(){
  while(next<ids.length){
    const id=ids[next++];
    if(results.some(item=>item.id===id))continue;
    try{
      const page=await (await fetch(`https://vk.com/photo-212936868_${id}`,{headers})).text();
      const value=page.match(/<meta name="og:image:secure_url" value="([^"]+)"/i)?.[1];
      if(!value)continue;
      const url=value.replaceAll('&amp;','&').replace(/cs=\d+x\d+/,'cs=1280x0');
      const response=await fetch(url);
      if(!response.ok||!response.headers.get('content-type')?.startsWith('image/'))continue;
      const data=Buffer.from(await response.arrayBuffer());
      if(data.length<10000)continue;
      await fs.writeFile(path.join(assetDir,`${id}.jpg`),data);
      results.push({id,source:`https://vk.com/photo-212936868_${id}`,bytes:data.length,album:albumIds.includes(id)});
    }catch(error){console.error(id,error.message)}
  }
}
await Promise.all(Array.from({length:5},worker));
results.sort((a,b)=>Number(a.id)-Number(b.id));
await fs.writeFile('vk-photos.json',JSON.stringify(results,null,2));
console.log(`Album IDs: ${albumIds.length}; downloaded: ${results.length}; album downloaded: ${results.filter(x=>x.album).length}`);
