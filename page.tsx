"use client";
import SplashScreen from "./SplashScreen";
import {useMemo,useState} from "react";
import {Chess,type Square} from "chess.js";
const files=["a","b","c","d","e","f","g","h"],ranks=["8","7","6","5","4","3","2","1"];
const glyph:Record<string,string>={wp:"♙",wn:"♘",wb:"♗",wr:"♖",wq:"♕",wk:"♔",bp:"♟",bn:"♞",bb:"♝",br:"♜",bq:"♛",bk:"♚"};
const api=process.env.NEXT_PUBLIC_API_URL??"http://localhost:4000";
export default function ComputerPage(){
 const [chess,setChess]=useState(()=>new Chess()); const [selected,setSelected]=useState<Square|null>(null); const [message,setMessage]=useState("You are White.");
 const squares=useMemo(()=>ranks.flatMap(r=>files.map(f=>`${f}${r}` as Square)),[]);
 async function click(sq:Square){
   if(chess.turn()!=="w"||chess.isGameOver())return;
   if(!selected){const p=chess.get(sq);if(p?.color==="w")setSelected(sq);return;}
   const target=chess.get(sq);if(target?.color==="w"){setSelected(sq);return;}
   const from=selected; setSelected(null);
   try{chess.move({from,to:sq,promotion:"q"});}catch{return;}
   setChess(new Chess(chess.fen())); if(chess.isGameOver())return;
   setMessage("Computer thinking…");
   const response=await fetch(`${api}/api/computer/best-move`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({fen:chess.fen(),depth:8})});
   const data=await response.json();
   if(!response.ok){setMessage(data.error??"Computer engine unavailable.");return;}
   const uci=String(data.bestMove??""); try{chess.move({from:uci.slice(0,2) as Square,to:uci.slice(2,4) as Square,promotion:(uci[4] as any)||undefined});setChess(new Chess(chess.fen()));setMessage(chess.isGameOver()?"Game over.":"Your move.");}catch{setMessage("Engine returned an invalid move.");}
 }
 return <main><header><strong>PLAY COMPUTER</strong></header><p role="status">{message}</p><div className="board" role="grid" aria-label="Chess board">{squares.map((sq,i)=>{const p=chess.get(sq),k=p?`${p.color}${p.type}`:"";return <button key={sq} className={`square ${(Math.floor(i/8)+i%8)%2===0?"light":"dark"} ${selected===sq?"selected":""}`} onClick={()=>click(sq)} aria-label={sq}>{glyph[k]??""}</button>})}</div></main>

}
