import test from 'node:test';
import assert from 'node:assert/strict';
import { createEnquiryHandler } from '../api/enquiry.ts';
const valid = { name: 'Website Test', email: 'test@example.com', company: 'Test', service: 'Business Advisory', message: 'Test enquiry', consent: 'on', website: '' };
async function run(handler, body=valid, headers={}, method='POST') {
 const res={statusCode:200,headers:{},setHeader(k,v){this.headers[k]=v},end(data){this.data=JSON.parse(data)}};
 await handler({method,headers:{origin:'https://jeffreysuffian.com','content-type':'application/json',...headers},body},res);
 return res;
}
test('sends only to the office with verified sender and visitor reply-to', async()=>{
 let sent;
 const handler=createEnquiryHandler({apiKey:()=> 'fake-test-key',fetch:async(url,init)=>{sent={url,...JSON.parse(init.body)};return Response.json({id:'email-test'})}});
 const res=await run(handler,{...valid,to:'attacker@example.com',from:'attacker@example.com'});
 assert.equal(res.statusCode,200);assert.equal(res.data.success,true);
 assert.deepEqual(sent.to,['info@jeffreysuffian.com']);assert.equal(sent.reply_to,valid.email);assert.match(sent.from,/@notify.jeffreysuffian.com/);assert.match(sent.text,/Test enquiry/);
});
test('rejects invalid consent, injection, spam and foreign origin without sending',async()=>{
 let calls=0;const handler=createEnquiryHandler({fetch:async()=>{calls++;return Response.json({id:'test'})}});
 for(const body of [{...valid,consent:''},{...valid,email:'bad'},{...valid,name:'A\r\nB'},{...valid,service:'unknown'},{...valid,website:'bot'},{...valid,message:'x'.repeat(4001)}])assert.equal((await run(handler,body)).statusCode,400);
 assert.equal((await run(handler,valid,{origin:'https://evil.example'})).statusCode,403);
 assert.equal((await run(handler,valid,{},'GET')).statusCode,405);assert.equal(calls,0);
});
test('provider rejection, malformed response, missing key and timeout never report success',async()=>{
 for(const fake of [async()=>Response.json({message:'error'},{status:403}),async()=>Response.json({}),async()=>{throw Error('timeout')}]){
 const res=await run(createEnquiryHandler({apiKey:()=> 'fake',fetch:fake}));assert.equal(res.statusCode,502);assert.equal(res.data.success,false);}
 assert.equal((await run(createEnquiryHandler({apiKey:()=>undefined}))).statusCode,503);
});
test('limits repeated valid submissions on the same instance',async()=>{
 const handler=createEnquiryHandler({apiKey:()=> 'fake',fetch:async()=>Response.json({id:'test'})});
 for(let i=0;i<5;i++)assert.equal((await run(handler)).statusCode,200);
 assert.equal((await run(handler)).statusCode,429);
});
