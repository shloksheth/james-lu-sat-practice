'use strict';
// Both course pages use the same local profile and backup format.
function importPracticeProfile(backup){
  if(backup?.format!=='jl-sat-backup-v1'||typeof backup.profile?.name!=='string'||!backup.profile.answers||!backup.profile.watched)throw Error('Invalid backup');
  const source=backup.profile,questions=[...COURSE.lessons.flatMap(l=>l.questions),...READINGPLAN.questions];
  const valid=new Set(questions.map(q=>q.id)),answers=Object.create(null),watched=Object.create(null);
  for(const [id,a] of Object.entries(source.answers)){
    if(valid.has(id)&&typeof a?.correct==='boolean'&&typeof a.value==='string')answers[id]={value:a.value.slice(0,100),correct:a.correct,firstCorrect:!!a.firstCorrect,attempts:Math.min(10000,Math.max(1,Number(a.attempts)||1)),submitted:!!a.submitted};
  }
  for(const [id,value] of Object.entries(source.watched))if(typeof value==='boolean'&&id.length<180)watched[id]=value;
  const raw=source.readingPlan||{},readingPlan={scores:{},grammar:{},notes:{},assessment:{draft:{},submitted:!!raw.assessment?.submitted}};
  const scoreRecord=(v,total)=>v&&Number.isInteger(v.correct)&&v.correct>=0&&v.correct<=total?{correct:v.correct,total,updated:typeof v.updated==='string'?v.updated.slice(0,40):''}:null;
  const totals={medium:8,foundations:8,advanced:8,challenge:4,retention:2};
  for(const m of READINGPLAN.modules){
    readingPlan.scores[m.id]={};
    for(const [stage,total] of Object.entries(totals)){const result=scoreRecord(raw.scores?.[m.id]?.[stage],total);if(result)readingPlan.scores[m.id][stage]=result}
  }
  READINGPLAN.grammar.resources.forEach((r,i)=>{const result=scoreRecord(raw.grammar?.['grammar-'+i],8);if(result)readingPlan.grammar['grammar-'+i]=result});
  for(const q of READINGPLAN.questions)if(typeof raw.notes?.[q.id]==='string')readingPlan.notes[q.id]=raw.notes[q.id].slice(0,2000);
  for(const q of READINGPLAN.capstone){const value=raw.assessment?.draft?.[q.id];if(/^[ABCD]$/.test(value||''))readingPlan.assessment.draft[q.id]=value}
  if(!READINGPLAN.capstone.every(q=>answers[q.id]?.submitted))readingPlan.assessment.submitted=false;
  return {name:source.name.slice(0,40)+' (imported)',answers,watched,readingPlan};
}
