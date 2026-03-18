//embeddings + vector store 
//kb brain -> knowledge base
//picks a embedding model -> open ai or gemini
//store ur embeddings in local storage or in vector db
//letting us insert chunks and later do search based on those chunks 

import { GoogleGenerativeAIEmbeddings} from "@langchain/google-genai"

import { OpenAIEmbeddings } from "@langchain/openai"
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory"
import { Document } from "@langchain/core/documents"

type Provider = "openai" | "google"

function getProvider(): Provider{
    const getCurrentProvider = (process.env.RAG_MODEL_PROVIDER ?? "gemini").toLowerCase()
    return getCurrentProvider === "gemini" ? 'google' : "openai"
}


function makeGoogleEmbeddings(){
    const key = process.env.GOOGLE_API_KEY ?? ""
    if(!key){
        throw new Error("Google api key not found")
    }

    return new GoogleGenerativeAIEmbeddings({
        apiKey : key ,
        model : "gemini-embedding-001",
       
    });
}

function makeOpenAiEmbeddings(){
    const key = process.env.OPENAI_API_KEY ?? ""
    if(!key){
        throw new Error("OpenAI api key not found")
    }

    return new OpenAIEmbeddings({
        openAIApiKey: key,
        model: "text-embedding-3-small"
    });
}

function makeEmbeddings(provider: Provider){
    return provider ==="google" ? makeGoogleEmbeddings(): makeOpenAiEmbeddings()
}

//vector store

let store: MemoryVectorStore | null = null ;
let currentSetProvider : Provider | null = null ;

export function getVectorStore(): MemoryVectorStore{
    const provider = getProvider();

    if(store && currentSetProvider === provider){
        return store ;
    }

    //provider changes or first time call- build a new provider
    store = new MemoryVectorStore(makeEmbeddings(provider));
    currentSetProvider = provider

    return store ;


}

export async function addChunks(docs : Document[]): Promise<number>{
    if(!Array.isArray(docs) || docs.length ===0 ) return 0 

    const store = getVectorStore()
    await store.addDocuments(docs)

    return docs.length;
}

export function resetStore(){
    store = null 
    currentSetProvider = null 

}