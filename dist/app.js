'use strict';
const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');
function closeMenu(){nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Открыть меню');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});

const packageDialog=document.querySelector('#package-dialog');
let currentPackage=null;
let packagePhotoIndex=0;
function showPackagePhoto(index){
  packagePhotoIndex=(index+currentPackage.images.length)%currentPackage.images.length;
  const photo=currentPackage.images[packagePhotoIndex];
  const image=document.querySelector('#package-image');
  image.src=photo.src;image.alt=photo.caption;
  document.querySelector('#package-photo-caption').textContent=photo.caption;
  document.querySelector('#package-photo-count').textContent=`${packagePhotoIndex+1} / ${currentPackage.images.length}`;
  document.querySelectorAll('#package-thumbnails button').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===packagePhotoIndex)));
}
function openPackage(name){
  currentPackage=packageData.get(name);
  if(!currentPackage)return;
  document.querySelector('#package-title').textContent=currentPackage.name;
  document.querySelector('#package-kind').textContent=currentPackage.kind;
  document.querySelector('#package-price').textContent=currentPackage.price;
  document.querySelector('#package-description').textContent=currentPackage.description;
  document.querySelector('#package-original').href=currentPackage.source;
  const list=document.querySelector('#package-items');
  list.replaceChildren(...currentPackage.items.map(text=>{const item=document.createElement('li');item.textContent=text;return item;}));
  document.querySelector('#package-inclusions').hidden=!currentPackage.items.length;
  document.querySelector('#package-composition-note').hidden=Boolean(currentPackage.items.length);
  document.querySelector('#package-thumbnails').replaceChildren(...currentPackage.images.map((photo,index)=>{
    const button=document.createElement('button');
    button.type='button';button.setAttribute('aria-label',`Фото ${index+1}: ${photo.caption}`);
    const image=document.createElement('img');
    image.src=photo.src;image.alt='';image.loading='lazy';button.append(image);
    button.addEventListener('click',()=>showPackagePhoto(index));
    return button;
  }));
  showPackagePhoto(0);
  packageDialog.showModal();packageDialog.scrollTop=0;
}
document.querySelectorAll('.choose,.package-photo-open').forEach(button=>button.addEventListener('click',()=>openPackage(button.dataset.package)));
document.querySelector('#package-prev').addEventListener('click',()=>showPackagePhoto(packagePhotoIndex-1));
document.querySelector('#package-next').addEventListener('click',()=>showPackagePhoto(packagePhotoIndex+1));
packageDialog.addEventListener('keydown',event=>{
  if(event.key==='ArrowRight'||event.key==='ArrowLeft'){
    event.preventDefault();showPackagePhoto(packagePhotoIndex+(event.key==='ArrowRight'?1:-1));
  }
});

document.querySelectorAll('dialog').forEach(dialog=>{
  dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{
    if(event.target===dialog){
      const rect=dialog.getBoundingClientRect();
      if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();
    }
  });
});
document.querySelector('#privacy-open').addEventListener('click',()=>document.querySelector('#privacy-dialog').showModal());

let photos=[];
const photoDialog=document.querySelector('#photo-dialog');
let photoIndex=0;
function showPhoto(index){
  photoIndex=(index+photos.length)%photos.length;
  const source=photos[photoIndex];
  const image=document.querySelector('#lightbox-image');
  image.src='assets/'+source.dataset.photo;image.alt=source.dataset.caption;
  document.querySelector('#lightbox-caption').textContent=source.dataset.caption;
  document.querySelector('#photo-count').textContent=`${photoIndex+1} / ${photos.length}`;
}
document.querySelectorAll('.gallery-photo').forEach(button=>button.addEventListener('click',()=>{
  photos=[...document.querySelectorAll('.gallery-photo')].filter(photo=>galleryCategory==='all'||photo.dataset.category===galleryCategory);
  showPhoto(photos.indexOf(button));photoDialog.showModal();
}));
document.querySelector('#prev-photo').addEventListener('click',()=>showPhoto(photoIndex-1));
document.querySelector('#next-photo').addEventListener('click',()=>showPhoto(photoIndex+1));
photoDialog.addEventListener('keydown',event=>{
  if(event.key==='ArrowRight'||event.key==='ArrowLeft'){
    event.preventDefault();showPhoto(photoIndex+(event.key==='ArrowRight'?1:-1));
  }
});
if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
  }),{threshold:.08});
  document.querySelectorAll('.studio-grid,.amenities article,.format-card,.price-card,.gallery-grid').forEach(element=>{element.classList.add('reveal');observer.observe(element);});
}
