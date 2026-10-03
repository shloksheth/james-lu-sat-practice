"use strict";
let profileId='default';try{profileId=JSON.parse(localStorage.getItem('jl-sat-profiles-v1'))?.active||'default'}catch{}
const storageKey='james-lu-sat-place-v1-'+profileId;
let saved={section:0,positions:[0,0,0,0]};
try{const parsed=JSON.parse(localStorage.getItem(storageKey));if(parsed && Number.isInteger(parsed.section) && parsed.section>=0 && parsed.section<TESTS.length && Array.isArray(parsed.positions) && parsed.positions.length===TESTS.length && parsed.positions.every((p,i)=>Number.isInteger(p)&&p>=0&&p<TESTS[i].items.length))saved=parsed;}catch{}
let section=saved.section;const requested=location.hash.slice(1);if(/^[0-3]$/.test(requested))section=Number(requested);
const frame=document.querySelector('#question'),jump=document.querySelector('#jump');
const details=['Equations, systems, inequalities, functions, and circles','Clause boundaries, punctuation, verb forms, and sentence structure','Data analysis, probability, statistics, geometry, and trigonometry','Evidence, inference, vocabulary, text purpose, and transitions'];
const icons=['ƒ','Aa','△','≡'],minutes=[45,30,50,35];
function render(){
 const t=TESTS[section],position=saved.positions[section];
 document.querySelector('#section-title').textContent=t.title;
 document.querySelector('#section-detail').textContent=`${t.items.length} questions · ${minutes[section]} min suggested · ${details[section]}`;
 document.querySelector('#position').textContent=`Question ${position+1} of ${t.items.length}`;
 jump.replaceChildren(...t.items.map((_,i)=>{const o=document.createElement('option');o.value=i;o.textContent=i+1;return o}));jump.value=position;
 frame.title=`${t.title}: question ${position+1}`;frame.src=t.items[position].url;
 document.querySelector('#source').href=t.items[position].url;
 document.querySelector('#previous').disabled=position===0;
 const next=document.querySelector('#next');next.disabled=position===t.items.length-1;next.textContent=position===t.items.length-1?'Final question':'Next question →';
 document.querySelector('#progress').style.width=`${(position+1)/t.items.length*100}%`;
 document.querySelectorAll('#sections button').forEach((b,i)=>b.setAttribute('aria-pressed',i===section?'true':'false'));
 saved.section=section;try{localStorage.setItem(storageKey,JSON.stringify(saved))}catch{}
}
function goQuestion(n){if(!Number.isInteger(n)||n<0||n>=TESTS[section].items.length)return;saved.positions[section]=n;render()}
TESTS.forEach((t,i)=>{const b=document.createElement('button');b.className='section-button';b.setAttribute('aria-pressed','false');const icon=document.createElement('span');icon.className='section-icon';icon.textContent=icons[i];icon.setAttribute('aria-hidden','true');const desc=document.createElement('span'),name=document.createElement('span'),count=document.createElement('span');name.className='section-name';name.textContent=t.title;count.className='section-count';count.textContent=`${t.items.length} questions`;desc.append(name,count);b.append(icon,desc);b.onclick=()=>{section=i;render()};document.querySelector('#sections').append(b)});
document.querySelector('#previous').onclick=()=>goQuestion(saved.positions[section]-1);
document.querySelector('#next').onclick=()=>goQuestion(saved.positions[section]+1);
jump.onchange=()=>goQuestion(Number(jump.value));render();
const library=document.createElement('a');
library.className='library-link';library.href='Start_Here.html';library.target='_blank';library.rel='noopener';library.textContent='Daily PDFs & study guide ↗';
document.querySelector('.course-note').after(library);
const libraryStyle=document.createElement('link');libraryStyle.rel='stylesheet';libraryStyle.href='library.css';document.head.append(libraryStyle);

const home=document.createElement('a');home.href='index.html#home';home.className='library-link';home.textContent='Back to home & course';document.querySelector('.brand').after(home);
