import { Client } from "@elastic/elasticsearch";
import { ELASTIC_URL_CONNECTION } from "../../bootstrap/Envs";

export const ElasticSearchClient = ()=> {
  try{
   return new Client({
      node: ELASTIC_URL_CONNECTION,
    });
  }catch(err){
    console.error(err)
    process.exit(1)
  } 
}

