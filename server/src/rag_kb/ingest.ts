

//chunk the text using fixed chunk rules 
//embed our chunks into vectors 
//push our vectors in memory store
//return a summary so that UI can say like this - added 1 document with 20 chunks , etc

//2 pipelines
//1> ingeston / indexing -> prepare knowledge base
//2> retrival/ answer -> use knowlege to give the answer

import {chunkText } from "./chunk.ts";
import {addChunks } from "./store.ts";

export type IngestTextInput = {
    text : string ,
    source? : string
}

export async function ingestText(input: IngestTextInput){
    const raw = (input.text ?? "").trim();

    if(!raw){
        throw new Error("No file to ingest");
    }
    const source = input.source ?? "pasted-text"

    const docs = chunkText(raw , source);

    //embed each chunks and add to our vector store

    const chunkCount = await addChunks(docs);

    return {
        docCount: 1,
        chunkCount ,
        source 
    }
}