import {describe,it,expect} from 'vitest';
import {contrastText} from '../lib/colors';
import {rateLimited} from '../lib/rate-limit';
import {validate,defaultValues,fieldsFor} from '../lib/print/order';
import {PRINT_PRODUCTS} from '../lib/print/data/products';
import {contactSchema} from '../lib/validations';
describe('production safeguards',()=>{
 it('chooses readable text for bright and dark accents',()=>{expect(contrastText('#c9a96e')).toBe('#05070d');expect(contrastText('#162f8a')).toBe('#ffffff');});
 it('expires per-instance rate limits',()=>{for(let i=0;i<5;i++)expect(rateLimited('test',100)).toBe(false);expect(rateLimited('test',100)).toBe(true);expect(rateLimited('test',60101)).toBe(false);});
 it('rejects blank names and excessive message sizes',()=>{expect(contactSchema.safeParse({name:'   ',phone:'09123456789',email:'',subject:'web',message:'x'.repeat(10001)}).success).toBe(false);});
 it('every printing product has contact fields and rejects blank names',()=>{
  for(const p of PRINT_PRODUCTS){expect(fieldsFor(p).some(f=>f.key==='phone')).toBe(true);expect(validate(p,{...defaultValues(p),name:'   ',phone:'09123456789'}).name).toBeTruthy();}
 });
});
