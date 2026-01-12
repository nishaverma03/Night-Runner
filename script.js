let jumping=false;
let score=0;
let level=1;
let speed=1500;

function jump(){
 if(jumping) return;
 jumping=true;
 hero.style.bottom="190px";
 setTimeout(()=>hero.style.bottom="40px",400);
 setTimeout(()=>jumping=false,600);
}

function duck(){
 hero.classList.add("duck");
 setTimeout(()=>hero.classList.remove("duck"),600);
}

function fire(){
 let f=document.createElement("div");
 f.className="fireball";
 f.innerText="💥";
 game.appendChild(f);

 let fireCheck=setInterval(()=>{
   document.querySelectorAll(".enemy").forEach(r=>{
     let fr=f.getBoundingClientRect();
     let rr=r.getBoundingClientRect();
     if(fr.left<rr.right && fr.right>rr.left && fr.bottom>rr.top && fr.top<rr.bottom){
        r.innerText="💀";
        setTimeout(()=>r.remove(),200);
        f.remove();
        score+=15;
        updateHUD();
     }
   });
 },20);

 f.addEventListener("animationend",()=>{f.remove();clearInterval(fireCheck);});
}

function spawnEnemy(){
 let r=document.createElement("div");
 r.className="enemy";
 r.innerText="👹";
 game.appendChild(r);

 let check=setInterval(()=>{
  let hr=hero.getBoundingClientRect();
  let rr=r.getBoundingClientRect();
  if(rr.left<hr.right && rr.right>hr.left && rr.bottom>hr.top){
    gameOver();
  }
 },10);

 r.addEventListener("animationend",()=>{r.remove();clearInterval(check);});
}
setInterval(spawnEnemy,speed);

setInterval(()=>{
 score++;
 updateHUD();
 if(score%100==0){
   level++;
   levelBox.innerText="Level: "+level;
   if(speed>700) speed-=120;
 }
},500);

function updateHUD(){
 scoreBox.innerText="Score: "+score;
 levelBox.innerText="Level: "+level;
}

function gameOver(){
 gameOverBox.style.display="flex";
}
