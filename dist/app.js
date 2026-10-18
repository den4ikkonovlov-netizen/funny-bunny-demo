'use strict';
const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');
function closeMenu(){nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Открыть меню');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
const summaries={'Мини':'2 часа · 6 500 ₽ · до 12 детей и 12 взрослых','Стандарт':'3 часа · 13 500 ₽ · аниматор на 1 час','Крио':'2 часа · 11 500 ₽ · крио-шоу или крио-мороженое'};
const booking=document.querySelector('#booking-dialog');
document.querySelectorAll('.choose').forEach(b=>b.addEventListener('click',()=>{document.querySelector('#selected-package').textContent='«'+b.dataset.package+'»';document.querySelector('#booking-summary').textContent=summaries[b.dataset.package];booking.showModal();}));
document.querySelectorAll('dialog').forEach(d=>{d.querySelector('.dialog-close').addEventListener('click',()=>d.close());d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});});
document.querySelector('#privacy-open').addEventListener('click',()=>document.querySelector('#privacy-dialog').showModal());
const photos=[...document.querySelectorAll('.gallery-photo')];const photoDialog=document.querySelector('#photo-dialog');let photoIndex=0;
function showPhoto(index){photoIndex=(index+photos.length)%photos.length;const source=photos[photoIndex];const img=document.querySelector('#lightbox-image');img.src='assets/'+source.dataset.photo;img.alt=source.dataset.caption;document.querySelector('#lightbox-caption').textContent=source.dataset.caption;document.querySelector('#photo-count').textContent=(photoIndex+1)+' / '+photos.length;}
photos.forEach((b,i)=>b.addEventListener('click',()=>{showPhoto(i);photoDialog.showModal();}));document.querySelector('#prev-photo').addEventListener('click',()=>showPhoto(photoIndex-1));document.querySelector('#next-photo').addEventListener('click',()=>showPhoto(photoIndex+1));photoDialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();showPhoto(photoIndex+1);}if(e.key==='ArrowLeft'){e.preventDefault();showPhoto(photoIndex-1);}});
if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.studio-grid,.amenities article,.format-card,.price-card,.gallery-grid,.steps article').forEach(el=>{el.classList.add('reveal');observer.observe(el);});}
