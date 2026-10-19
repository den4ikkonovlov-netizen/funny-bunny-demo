'use strict';

// Содержимое каталога сверено с публичными карточками сообщества. Непроверенные
// условия пакетов намеренно не подменяются предположениями.
const offers = [
  {name:'Малыш',price:'11 000 ₽',kind:'Пакет',description:'Формат праздника для самых маленьких гостей.',url:'https://vk.ru/market/product/paket-malysh-212936868-11739864'},
  {name:'Лайт',price:'9 000 ₽',kind:'Пакет',description:'Лёгкий формат для семейного праздника.',url:'https://vk.ru/market/product/paket-lajt-212936868-7185922'},
  {name:'Комфорт',price:'17 000 ₽',kind:'Пакет',description:'Праздник с программой, которую можно обсудить под вашу компанию.',url:'https://vk.ru/market/product/paket-komfort-212936868-7185915'},
  {name:'Стандарт +',price:'15 000 ₽',kind:'Пакет',description:'Расширенная версия программы «Стандарт».',url:'https://vk.ru/market/product/paket-standart-212936868-12891777'},
  {name:'Крио +',price:'17 000 ₽',kind:'Пакет',description:'Расширенная программа с крио-тематикой.',url:'https://vk.ru/market/product/paket-krio-212936868-12834929'},
  {name:'Крио-шоу',price:'5 000 ₽',kind:'Отдельная услуга',description:'Эффектная программа с жидким азотом.',url:'https://vk.ru/market/product/krio-shou-212936868-12806394'},
  {name:'Мастер-класс',price:'4 000 ₽',kind:'Отдельная услуга',description:'Творческое занятие для детей.',url:'https://vk.ru/market/product/master-klass-212936868-13359518'},
  {name:'Шоу мыльных пузырей',price:'4 000 ₽',kind:'Отдельная услуга',description:'Праздничная программа с мыльными пузырями.',url:'https://vk.ru/market/product/shou-mylnykh-puzyrey-212936868-12806722'},
  {name:'Фокусник',price:'6 500 ₽',kind:'Отдельная услуга',description:'Шоу фокусов для детского праздника.',url:'https://vk.ru/market/product/fokusnik-212936868-12806423'}
];

const catalog=document.createElement('section');
catalog.className='section catalog';
catalog.id='catalog';
catalog.innerHTML=`<div class="section-top"><span class="eyebrow">ВСЁ ИЗ КАТАЛОГА СООБЩЕСТВА</span><span class="mini-caption">Пакеты и отдельные услуги</span></div><h2>Найдётся праздник<br><span class="serif">для каждого.</span></h2><p class="catalog-intro">Кроме трёх популярных вариантов выше, в каталоге студии есть другие пакеты и услуги. По ссылкам можно посмотреть актуальный состав каждого предложения.</p><div class="catalog-grid">${offers.map(item=>`<article class="catalog-card"><span class="catalog-kind">${item.kind}</span><h3>${item.name}</h3><strong>${item.price}</strong><p>${item.description}</p><a href="${item.url}" target="_blank" rel="noopener noreferrer">Описание в ВК ↗</a></article>`).join('')}</div><p class="catalog-note">Цены из каталога ВК на 18 октября 2026 года. Перед бронированием подтвердите стоимость, состав программы и свободное время у администратора.</p>`;
document.querySelector('#gallery').before(catalog);
catalog.querySelector('.catalog-intro').textContent='Все найденные программы и отдельные услуги собраны здесь. На фотографиях — реальные моменты праздников и залы студии.';
const offerImages={
  'Малыш':['457246597','457246598','457244913'],
  'Лайт':['457246623','457246622','457246636'],
  'Комфорт':['457246599','457246602','457246594'],
  'Стандарт +':['457246594','457246600','457246601'],
  'Крио +':['457246625','457246639','457246640'],
  'Крио-шоу':['457246625','457246638','457246633'],
  'Мастер-класс':['457246635','457246596','457246638'],
  'Шоу мыльных пузырей':['457246633','457246622','457246640'],
  'Фокусник':['457246625','457246623','457246636']
};
catalog.querySelectorAll('.catalog-card').forEach((card,index)=>{
  const item=offers[index];
  const images=offerImages[item.name];
  card.insertAdjacentHTML('afterbegin',`<div class="catalog-photos" aria-label="Фотографии праздников в студии"><img src="assets/vk/${images[0]}.jpg" alt="Момент праздника в студии Фанни Банни" loading="lazy"><div><img src="assets/vk/${images[1]}.jpg" alt="Гости на празднике в Фанни Банни" loading="lazy"><img src="assets/vk/${images[2]}.jpg" alt="Пространство или программа студии Фанни Банни" loading="lazy"></div><span>Фото из сообщества</span></div>`);
  card.querySelector('a').textContent='Источник цены ↗';
  card.querySelector('a').classList.add('catalog-source');
  card.querySelector('a').before(Object.assign(document.createElement('button'),{className:'button button-outline choose',textContent:`Обсудить «${item.name}»`}));
  card.querySelector('.choose').dataset.package=item.name;
});

const featuredPhotos={
  'Мини':['457244913','457244917','457245071'],
  'Стандарт':['457246594','457246599','457246602'],
  'Крио':['457246625','457246633','457246638']
};
document.querySelectorAll('.price-card').forEach(card=>{
  const name=card.querySelector('.choose').dataset.package;
  const images=featuredPhotos[name];
  card.insertAdjacentHTML('afterbegin',`<div class="package-photos" aria-label="Фотографии студии и праздников"><img src="assets/vk/${images[0]}.jpg" alt="Фото из сообщества Фанни Банни" loading="lazy"><div><img src="assets/vk/${images[1]}.jpg" alt="Зал или гости студии" loading="lazy"><img src="assets/vk/${images[2]}.jpg" alt="Праздник в студии" loading="lazy"></div><span>Реальные фото студии</span></div>`);
});

const galleryPhotos=[
  ['457246594','Именинница с друзьями'],['457246597','Друзья в праздничной фотозоне'],['457246598','Тёплые объятия на празднике'],['457246599','Общая фотография гостей'],
  ['457246600','Именинница с тортом'],['457246601','Радость именинницы'],['457246602','Поздравление с днём рождения'],['457246622','Игры на празднике'],
  ['457246623','Танцы и веселье'],['457246625','Дети смотрят праздничную программу'],['457246633','Ведущая и дети'],['457246635','Дети на мастер-классе'],
  ['457246636','Подвижные игры'],['457246638','Встреча с героиней праздника'],['457246639','Эстафета с друзьями'],['457246640','Детский праздник в студии'],
  ['457244913','Игровая комната'],['457244915','Светлый зал студии'],['457244917','Зал с праздничным столом'],['457244934','Игровая зона'],
  ['457245071','Ещё один зал студии'],['457245074','Пространство для детского праздника'],
  ['457246596','Маленькие моменты праздника'],['457244916','Праздничная сервировка'],['457244925','Игрушки для маленьких гостей'],
  ['457244926','Зал для игр и танцев'],['457244931','Праздничные детали'],['457244933','Пеленальный столик'],
  ['457245072','За большим общим столом'],['457245073','Место для угощений'],['457245076','Бильярд в игровой зоне']
];
const galleryGrid=document.querySelector('.gallery-grid');
galleryGrid.innerHTML=galleryPhotos.map(([id,caption])=>`<button class="gallery-photo" data-photo="vk/${id}.jpg" data-category="${Number(id)>=457246000?'party':'studio'}" data-caption="${caption}" aria-label="Открыть фото: ${caption}"><img src="assets/vk/${id}.jpg" alt="${caption}" loading="lazy"><span>${caption} <b aria-hidden="true">↗</b></span></button>`).join('');
const galleryFilters=document.createElement('div');
galleryFilters.className='gallery-filters';
galleryFilters.setAttribute('role','group');
galleryFilters.setAttribute('aria-label','Выбор фотографий');
galleryFilters.innerHTML='<button type="button" data-filter="all" aria-pressed="true">Все фотографии</button><button type="button" data-filter="party" aria-pressed="false">Праздники</button><button type="button" data-filter="studio" aria-pressed="false">Студия</button><span class="gallery-total" aria-live="polite"></span>';
galleryGrid.before(galleryFilters);
const morePhotos=document.createElement('button');
morePhotos.type='button';
morePhotos.className='button button-outline gallery-more';
galleryGrid.after(morePhotos);
let galleryCategory='all';
let galleryLimit=12;
function updateGallery(){
  let matching=0;
  galleryGrid.querySelectorAll('.gallery-photo').forEach(photo=>{
    const matches=galleryCategory==='all'||photo.dataset.category===galleryCategory;
    photo.hidden=!matches||++matching>galleryLimit;
  });
  galleryFilters.querySelector('.gallery-total').textContent=`${Math.min(matching,galleryLimit)} из ${matching} фото`;
  galleryFilters.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===galleryCategory)));
  morePhotos.hidden=matching<=galleryLimit;
  morePhotos.textContent=`Показать ещё ${Math.min(12,Math.max(0,matching-galleryLimit))} фото`;
}
galleryFilters.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{
  galleryCategory=button.dataset.filter;
  galleryLimit=12;
  updateGallery();
}));
morePhotos.addEventListener('click',()=>{galleryLimit+=12;updateGallery();});
updateGallery();

const sharedPackageItems=['Два зала площадью 120 м² и игровая комната','Игрушки для малышей, аэрохоккей, настольный футбол и бильярд','Xbox, проектор, дискошар и музыка','Электронные приглашения','Посуда, помощь с сервировкой, чай, кофе и вода','Уборка после праздника'];
const packageExtras={
  'Мини':['2 часа аренды студии','До 12 детей и 12 взрослых',...sharedPackageItems],
  'Стандарт':['3 часа аренды студии','Аниматор на 1 час','До 12 детей и 12 взрослых',...sharedPackageItems],
  'Крио':['2 часа аренды студии','До 12 детей и 12 взрослых','Крио-шоу 30 минут или 12 порций крио-мороженого','Крио-душ, пузыри, газировка, «дыхание дракона», полимерные червячки и крио-пушка','Вынос торта с азотным туманом','Сопровождение администратора',...sharedPackageItems]
};
document.querySelectorAll('.price-card').forEach(card=>{
  const name=card.querySelector('.choose').dataset.package;
  const details=document.createElement('details');
  details.className='package-details';
  details.innerHTML=`<summary>Что входит <span>+</span></summary><ul>${packageExtras[name].map(item=>`<li>${item}</li>`).join('')}</ul>`;
  card.querySelector('.choose').before(details);
});

// These images illustrate the studio. Exact product photo sets still need verification.
const packageData=new Map();
document.querySelectorAll('.price-card,.catalog-card').forEach(card=>{
  const button=card.querySelector('.choose');
  const name=button.dataset.package;
  const offer=offers.find(item=>item.name===name);
  const selected=featuredPhotos[name]||offerImages[name];
  const images=[...new Set([...selected,'457244915','457244913','457244917','457244934','457245076'])];
  packageData.set(name,{
    name,
    price:card.querySelector('.price,strong').textContent.trim(),
    kind:offer?.kind||'Пакет',
    description:offer?.description||card.querySelector('p:not(.price)').textContent,
    items:packageExtras[name]||[],
    images:images.map(id=>({src:`assets/vk/${id}.jpg`,caption:galleryPhotos.find(photo=>photo[0]===id)?.[1]||'Фотография студии Фанни Банни'})),
    source:card.querySelector('.package-source,.catalog-source').href
  });
  button.textContent='Фото и подробности ↗';
  button.setAttribute('aria-label',`Фотографии и описание: ${name}`);
  button.setAttribute('aria-haspopup','dialog');
  const collage=card.querySelector('.package-photos,.catalog-photos');
  const openPhotos=document.createElement('button');
  openPhotos.type='button';
  openPhotos.className='package-photo-open';
  openPhotos.dataset.package=name;
  openPhotos.setAttribute('aria-label',`Открыть фотографии: ${name}`);
  openPhotos.textContent=`Смотреть ${images.length} фото ↗`;
  collage.querySelector('span').textContent='Залы и праздники студии';
  collage.append(openPhotos);
});

const demo=document.createElement('div');
demo.className='demo-banner';
demo.innerHTML='<strong>ДЕМО-ВЕРСИЯ</strong><span>Концепция нового сайта, разработанная специально для «Фанни Банни». Не является официальным сайтом студии.</span>';
document.querySelector('footer').after(demo);

