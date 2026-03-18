//why we actually need chunks 
// it searches *chunks* of the text

//small enough but at the same time big enough so that it contains full ideal definition

import {Document} from "@langchain/core/documents"

export const CHUNK_SIZE= 1000 ;
export const CHUNK_OVERLAP= 150;

//text=> markdown , article , policy
//sources=> what is his name ? -> vishal(source #0)

export function chunkText(text: string , source: string): Document []{
    const clean = (text ?? "").replace(/\r\n/g,"\n");

    const docs : Document[] = [];

    if(!clean.trim()) return docs 
    //1000 , 150
    //chunk 0 -> [0...1000]
    //chunk 1 -> [850...1850]

    const step = Math.max(1, CHUNK_SIZE - CHUNK_OVERLAP)

    let start = 0 ;
    let chunkId = 0 ;

    while(start < clean.length){
        const end = Math.min(clean.length , start + CHUNK_SIZE);
        
        //remove trailing/leading blank lines
        const slice = clean.slice(start, end).trim();

        if(slice.length> 0){
            docs.push(
                new Document({
                    pageContent : slice ,
                    metadata : {
                        source,
                        chunkId
                    }
                })
            )
            chunkId++ ;
        }
        start += step ;
    }
    return docs ;
}