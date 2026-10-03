'use strict';
const key='jl-sat-profiles-v1',sections=['Desmos Mastery','Grammar Mastery','Non-Desmos','Reading Comprehension'];
let store={active:'default',profiles:{default:{name:'My practice',answers:{},watched:{}}}},storageOK=true;
try{const s=JSON.parse(localStorage.getItem(key));if(s&&s.profiles&&s.profiles[s.active])store=s}catch{}
const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rich=s=>esc(s).replace(/&lt;u&gt;/g,'<u>').replace(/&lt;\/u&gt;/g,'</u>');
const profile=()=>store.profiles[store.active];
function save(){try{localStorage.setItem(key,JSON.stringify(store))}catch{storageOK=false;$('#profile-status').textContent='Browser storage is unavailable. Export a backup before leaving.'}}
function complete(l){return l.questions.every(q=>profile().answers[q.id]?.correct)}
function tally(l){return l.questions.filter(q=>profile().answers[q.id]?.correct).length}
function sectionLink(s){return 'sections.html#'+s}
function lessonLink(l){return '#lesson/'+l.id}
function render(){
 $('#profile-button').textContent=profile().name;
 const route=location.hash.slice(1)||'home';let html='';
 if(route==='home'){
 const done=COURSE.lessons.filter(complete).length;
 html=`<section class="hero"><div><div class="eyebrow">Your course companion</div><h1>A little practice.<br>A clearer path forward.</h1><p>James Lu SAT Practice brings your lessons, daily questions, and section tests into one place. Learn a method, put it to work, then review what needs another try.</p><a class="action primary" href="#course">Continue the course →</a></div><div class="stats"><div><strong>24</strong><p>video lessons</p></div><div><strong>${done}/24</strong><p>practice sets mastered</p></div><div><strong>199</strong><p>original questions</p></div></div></section><div class="grid"><article class="card"><div class="eyebrow">01 / Follow the path</div><h2>Course</h2><p>Watch a lesson, finish its practice, and move toward the section test.</p><a href="#course">Open your course →</a></article><article class="card"><div class="eyebrow">02 / Choose a day</div><h2>Daily practice</h2><p>Jump straight into any of the 17 day or standalone practice sets.</p><a href="#daily">Browse daily practice →</a></article><article class="card"><div class="eyebrow">03 / Put it together</div><h2>Section tests</h2><p>112 selected bank questions across four cumulative tests. Active questions excluded during selection.</p><a href="sections.html">Take a section test →</a></article></div><div class="banner"><strong>${esc(profile().name)}’s workspace</strong><br>Your answers and progress stay on this device. Use Local profile to create a separate workspace or export a backup.</div>`;
 }else if(route==='course'){
 html='<div class="eyebrow">Learn → Practice → Review</div><h1>Your SAT course</h1><p class="muted">Follow the order below, or revisit any lesson. A practice set is mastered when every question has been answered correctly; first-attempt results remain visible in review.</p><div class="course-list">';
 sections.forEach((s,si)=>{const ls=COURSE.lessons.filter(l=>l.section===si);const done=ls.filter(complete).length;html+=`<section class="card"><div class="eyebrow">Section ${si+1} · ${done}/${ls.length} practice sets mastered</div><h2>${s}</h2><div class="progress"><div style="width:${done/ls.length*100}%"></div></div>`;ls.forEach(l=>html+=`<div class="lesson-row"><div><a href="${lessonLink(l)}">${esc(l.title)}</a><div class="muted">${esc(COURSE.days[l.day].title)} · ${l.questions.length} questions</div></div><span class="tag">${complete(l)?'Mastered':tally(l)+'/'+l.questions.length+' correct'}</span></div>`);html+=`<div class="lesson-row"><a href="${sectionLink(si)}">Finish with the ${s} section test →</a><span class="tag">Bank test</span></div></section>`});html+='</div>';
 }else if(route==='daily'){
 html='<div class="eyebrow">Practice on your schedule</div><h1>Choose your daily set</h1><div class="grid">'+COURSE.days.map((d,i)=>`<article class="card"><h3>${esc(d.title)}</h3><p>${d.lessons.reduce((n,id)=>n+COURSE.lessons.find(l=>l.id===id).questions.length,0)} questions · ${d.lessons.length} video${d.lessons.length>1?'s':''}</p><a href="#day/${i}">Start practice →</a><br><a href="${d.pdf}" target="_blank" rel="noopener">PDF version ↗</a></article>`).join('')+'</div>';
 }else if(route.startsWith('lesson/')||route.startsWith('day/')){
 const dayMode=route.startsWith('day/');const day=COURSE.days[Number(route.split('/')[1])];const lesson=COURSE.lessons.find(l=>l.id===route.split('/')[1]);
 if((dayMode&&!day)||(!dayMode&&!lesson)){location.hash='home';return}
 const ls=dayMode?day.lessons.map(id=>COURSE.lessons.find(l=>l.id===id)):[lesson];
 html='<div class="workspace"><aside class="outline"><a href="#course">← Course overview</a>';
 COURSE.lessons.filter(l=>l.section===ls[0].section).forEach(l=>html+=`<a class="${ls.includes(l)?'active':''}" href="${lessonLink(l)}">${complete(l)?'✓ ':''}${esc(l.title)}</a>`);
 html+=`<a href="${sectionLink(ls[0].section)}">Section test →</a></aside><div><div class="eyebrow">${sections[ls[0].section]}</div><h1>${esc(dayMode?day.title:lesson.title)}</h1>`;
 ls.forEach(l=>{if(!dayMode)html+=`<iframe class="video" src="${l.embed}" title="${esc(l.title)} video lesson" allow="fullscreen" allowfullscreen></iframe><p><a href="${l.url}" target="_blank" rel="noopener">Open original lesson ↗</a> <span class="muted">· If the embed needs sign-in, use the original lesson.</span></p><button data-watch="${l.id}">${profile().watched[l.id]?'✓ Lesson marked watched':'Mark lesson watched'}</button>`;
 html+=`<h2>${dayMode?esc(l.title):'Put it into practice'}</h2><p class="muted">${tally(l)}/${l.questions.length} correct · Submit an answer to see its explanation. Numeric answers accept decimals or fractions.</p>`;
 l.questions.forEach((q,i)=>html+=questionHTML(q,i));
 const next=COURSE.lessons[COURSE.lessons.indexOf(l)+1];
 html+=`<div class="banner"><strong>${complete(l)?'Practice mastered. Ready for the next step.':'Keep going — review missed questions and try them again.'}</strong><div class="controls" style="margin-top:14px"><button data-retry="${l.id}">Retry missed questions</button><a class="action primary" href="${next&&next.section===l.section?lessonLink(next):sectionLink(l.section)}">${next&&next.section===l.section?'Next lesson':'Section test'} →</a></div></div>`;
 });html+='</div></div>';
 }else{location.hash='home';return}
 $('#content').innerHTML=html;
 document.querySelectorAll('form[data-question]').forEach(f=>f.onsubmit=e=>{e.preventDefault();const q=COURSE.lessons.flatMap(l=>l.questions).find(q=>q.id===f.dataset.question);const val=new FormData(f).get('answer');if(!val||!String(val).trim())return;const prev=profile().answers[q.id];const correct=q.choices?val===q.answer:numericEqual(val,q.answer);profile().answers[q.id]={value:val,correct,firstCorrect:prev?.firstCorrect??correct,attempts:(prev?.attempts||0)+1,submitted:true};save();const y=scrollY;render();window.scrollTo(0,y)});
 document.querySelectorAll('[data-watch]').forEach(b=>b.onclick=()=>{profile().watched[b.dataset.watch]=!profile().watched[b.dataset.watch];save();render()});
 document.querySelectorAll('[data-retry]').forEach(b=>b.onclick=()=>{const l=COURSE.lessons.find(l=>l.id===b.dataset.retry);l.questions.forEach(q=>{const a=profile().answers[q.id];if(a&&!a.correct)a.submitted=false});save();render();const first=l.questions.find(q=>profile().answers[q.id]&&!profile().answers[q.id].correct);if(first)document.getElementById(first.id)?.scrollIntoView({behavior:'smooth',block:'center'})});
}
function numericValue(raw){const s=String(raw).trim().replace(/−/g,'-').replace(/,/g,'');if(/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)\s*\/\s*[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s)){const [a,b]=s.split('/').map(Number);return b===0?NaN:a/b}return /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s)?Number(s):NaN}
function numericEqual(a,b){const x=numericValue(a),y=numericValue(b);return Number.isFinite(x)&&Number.isFinite(y)&&Math.abs(x-y)<=1e-6*Math.max(1,Math.abs(y))}
function questionHTML(q,i){const a=profile().answers[q.id];const locked=a?.submitted;let h=`<article class="question" id="${q.id}"><div class="eyebrow">Question ${i+1}</div><p class="stem">${rich(q.stem)}</p>`;
 h+=(q.equations||[]).map(src=>`<img class="equation" src="${src}" alt="${esc(q.math)}">`).join('');
 if(q.image)h+=`<img class="figure" src="${q.image}" alt="Diagram for this question">`;
 if(q.figure?.type==='table')h+='<table><thead><tr>'+q.figure.headers.map(x=>'<th scope="col">'+esc(x)+'</th>').join('')+'</tr></thead><tbody>'+q.figure.rows.map(row=>'<tr>'+row.map(x=>'<td>'+esc(x)+'</td>').join('')+'</tr>').join('')+'</tbody></table>';
 h+=`<form data-question="${q.id}"><fieldset style="border:0;padding:0;margin:0" ${locked?'disabled':''}><legend class="muted">Your answer</legend>`;
 if(q.choices)q.choices.forEach((c,j)=>{const v=String.fromCharCode(65+j);h+=`<label class="choice"><input type="radio" name="answer" value="${v}" required ${a?.value===v?'checked':''}><span><strong>${v}.</strong> ${rich(c)}</span></label>`});
 else h+=`<label><input class="numeric" name="answer" aria-label="Answer for question ${i+1}" value="${esc(a?.value||'')}" placeholder="e.g. 0.5 or 1/2" required inputmode="text"></label>`;
 h+=`<button class="primary" style="margin-top:14px">Check answer</button></fieldset></form>`;
 if(locked)h+=`<div class="feedback ${a.correct?'':'wrong'}" role="status"><strong>${a.correct?'Correct':'Keep reviewing'} · Answer: ${esc(q.answer)}</strong><p>${rich(q.why)}</p><p class="muted">First attempt: ${a.firstCorrect?'correct':'missed'} · ${a.attempts} attempt${a.attempts===1?'':'s'}</p></div>`;
 return h+'</article>';
}
function profileMenu(){const s=$('#profile-select');s.replaceChildren(...Object.entries(store.profiles).map(([id,p])=>{const o=document.createElement('option');o.value=id;o.textContent=p.name;return o}));s.value=store.active}
$('#profile-button').onclick=()=>{profileMenu();$('#profiles').showModal()};$('#close-profile').onclick=()=>$('#profiles').close();
$('#profile-select').onchange=e=>{store.active=e.target.value;save();render()};
$('#new-profile').onsubmit=e=>{e.preventDefault();const name=$('#profile-name').value.trim();if(!name)return;const id=crypto.randomUUID();store.profiles[id]={name,answers:{},watched:{}};store.active=id;save();profileMenu();render();$('#profile-name').value='';$('#profile-status').textContent='Profile created on this device.'};
$('#export').onclick=()=>{const blob=new Blob([JSON.stringify({format:'jl-sat-backup-v1',profile:profile()},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='sat-practice-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};
$('#import').onchange=async e=>{try{const f=e.target.files[0];if(!f)return;if(f.size>2000000)throw Error();const b=JSON.parse(await f.text());if(b.format!=='jl-sat-backup-v1'||typeof b.profile?.name!=='string'||!b.profile.answers||!b.profile.watched)throw Error();const valid=new Set(COURSE.lessons.flatMap(l=>l.questions.map(q=>q.id)));const answers={};for(const [id,a] of Object.entries(b.profile.answers)){if(valid.has(id)&&typeof a.correct==='boolean'&&typeof a.value==='string')answers[id]={value:a.value.slice(0,100),correct:a.correct,firstCorrect:!!a.firstCorrect,attempts:Math.max(1,Number(a.attempts)||1),submitted:!!a.submitted}}const id=crypto.randomUUID();store.profiles[id]={name:b.profile.name.slice(0,40)+' (imported)',answers,watched:b.profile.watched};store.active=id;save();profileMenu();render();$('#profile-status').textContent='Backup imported as a new profile.'}catch{$('#profile-status').textContent='Could not import this file. Choose a SAT practice backup.'}e.target.value=''};
window.addEventListener('hashchange',()=>{render();window.scrollTo(0,0)});save();render();
