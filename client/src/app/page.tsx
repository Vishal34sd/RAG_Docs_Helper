"use-client"

type Source ={
  source : string ,
  chunkId : number
}

type AskResponse = {
  answer : string ,
  source : Source[] 
  confidence : number
}

type IngestResult = {
  ok : boolean ,
  docCount : number ,
  chunkCount : number ,
  source : string 
}


export default function LightRagKB(){
  return (
    <div className = "mx-auto max-w-5xl px-4 py-8 flex flex-col gap-8">
      < header className = "flex flex-col gap-1">
      <h1>Knowledge Base</h1>
      < p  className = "text-sm text-muted-foreground">
      Light RAG Demo. Add your own docs , then ask questions . Model must 
      answer from what you ingested
      </p>
      </header>
      <section className = "grid grid-col-1 lg:grid-cols-2 gap-6"></section>
    </div>
  )
}