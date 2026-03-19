
// ask the kb - knowledge -> retrieval + ans
// what is our refund policy for late payments ? -> query

// 1-> embed the query
//vector -> array of numbers
//we must use the same embeddings model that we used while indexing the KB

// 2-> retrive most similar chunks from our vector store

//build a ans/grounded answer
// built a prompt 
// tell the model 
// model is going give the final ans & confidence score also

// [{answer : "" , sources : [] , confidence}]

export type KBSource = {
    source : string ;
    chunkId : number
}

export type KBAskResult = {
    answer : string ;
    sources : KBSource[];
    confidence : number ;
}

function buildContext(){
    
}

export async function askKB(query : string , k= 2 ): Promise<KBAskResult>{

    const validateCurrentQuery = (query?? "").trim()

    if(!validateCurrentQuery){
        throw new Error("Query is empty")
    }

    const store = getVectorStore();

    //embed the query
    const embedQuery = await store.embeddings.embedQuery(validateCurrentQuery);

    const pairs = await store.similaritySearchVectorWithScore(embedQuery , k );

    //pairs are look like this below 
    // [
    // [Document {pagecontent , metadatat}, [Document { pagecontent , metadata}]]
    // ]

    const chunks = pairs.map(([doc])=>({
        text : doc.pageContent || "",
        meta : doc.metadata || {}
    }))

    const scores = pairs.map(([_ , score])=> Number(score) || 0);

    //prompt context 
    const context = buildContext(chunks);




}
