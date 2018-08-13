/* eslint-disable no-unused-vars */
import {
  pick, map as mapFP, transform as transformFP,flatten,mapValues as mapValuesFP,forOwn as forOwnFP,mapKeys,
  reduce as reduceFP,capitalize,once,isError as isJSError,spread,rest,omit,filter as filterFP,uniqueId,
  find as findFP,findIndex,findKey,iteratee,matches as matchesFP,reject,concat,constant,overEvery,overSome,
  negate,flatMap,flattenDeep,over, identity, get,each as eachFP,pickBy,difference,
  isInteger,isError,isNumber,isObjectLike,hasIn,has,isWeakMap, isWeakSet, isMap, isSet,isEmpty,
  isString, isPlainObject, isFunction, isNull,isUndefined,set,unset,curry,mergeAllWith as mergeAllWithFP,mergeAll as mergeAllFP,
  omitBy,rearg,rangeStep,assignAll as assignAllFP,assignAllWith as assignAllWithFP,ary as arity,
  unary,sortBy,keyBy,size,partition,every,values,keys,zip,unzip,zipObject,union,conforms,toPath
} from 'lodash/fp';
import {merge,mergeWith,set as _set,debounce as _debounce,memoize as _memoize} from 'lodash';
// import $$observable from 'symbol-observable';


export const [forOwn,transform,find,filter,map,each,mapValues,reduce] = [
  forOwnFP,transformFP,findFP,filterFP,mapFP,eachFP,mapValuesFP,reduceFP].map(fn=>fn.convert({cap:false}));

export {
  identity,get,pick,flatten,mapKeys,capitalize,once,isJSError,spread,rest,keyBy,
  findKey,uniqueId,findIndex,set,mergeWith,reject,concat,constant,flatMap,flattenDeep,omit,
  isInteger,isError,isNumber,isObjectLike,hasIn,has,isWeakMap, isWeakSet, isMap, isSet,isEmpty,
  isString, isPlainObject, isFunction, isNull,isUndefined,_set,unset,pickBy,curry,omitBy,sortBy,
  rearg,rangeStep,over,size,partition,every,values,keys,zip,unzip,zipObject,difference,
  union,toPath
}


// predicates
export const isFalsy = arg=>!arg;
export const isTruthy = arg=>!!arg;
export const is = val1=>val2=>val1===val2;
export const isUndefOrNull = val => val == undefined; // eslint-disable-line
export const isPromise = x=>!isUndefOrNull(x) && isFunction(x.then);
export const {isArray} = Array;
export const len = num=>({length})=>length===num;
export const len0 = ({length})=>length===0;
export const len1 = ({length})=>length===1;
export const first = get(0);
export const keyIs = rearg([1])(is);
export const isKeyMatch = predicate=>(v,k)=>predicate(k);
export const isValMatch = predicate=>(v,k)=>predicate(v);
export const isProductionEnv = ()=>process.env.NODE_ENV === 'production';
export const matches = arity(1)(matchesFP);
// export const isObservable = x=>x&&isFunction(x[$$observable]);
// stubs
export const stubNull = ()=>null;
export const stubArray = ()=>[];
export const stubObject = ()=>({});
export const stubString = ()=>'';
export const stubTrue = ()=>true;
export const stubFalse = ()=>false;



// strings
export const split = splitter=>str=>str.split(splitter);
// functions
export const invokeArgsOnObj = (...args) => mapValues(fn=>fn(...args));
export const invokeObjectWithArgs = (obj)=>(...args) => mapValues(fn=>isFunction(fn) ? fn(...args) : fn)(obj);
export const partialBlankObj = fn => (...vals) => fn({},...vals);
export const mergeToBlank = partialBlankObj(Object.assign);
export const noop = ()=>{};
export const overObj = obj=>(...args)=>mapv(f=>f(...args))(obj);
export const converge = (arg)=>(isArray(arg)?over:overObj)(arg);
export const mergeAllWith = curry((fn,arr)=>mergeAllWithFP(fn,arr),2);
export const assignAllWith = curry((fn,arr)=>assignAllWithFP(fn,arr),2);
export const mergeAll = arr=>mergeAllFP(arr);
export const assignAll = arr=>assignAllFP(arr);
export const memoize = curry(rearg([1,0],_memoize),2);
export const debounce = curry((wait,opts,fn)=>_debounce(fn,wait,opts),3);

// logic
export const makeArrayWrapperOptional = fn=>(...m)=>m[0] && isArray(m[0][0]) ? fn(m[0]) : fn(m);
export const condNoExec = makeArrayWrapperOptional(
  matrix=>(...args)=>{for (let [pred,fn] of matrix){if(pred(...args)){return fn;}}}
);
export const cond = makeArrayWrapperOptional(
  matrix=>(...args)=>condNoExec(...(matrix))(...args)(...args)
)
export const ifenx = (pred,T,F=identity)=>(...args)=>(pred(...args) ? T : F);
export const ifElse = (pred,T,F=identity)=>(...args)=>(pred(...args) ? T : F)(...args);
export const ife = ifElse;
export const and = rest(overEvery);
export const not = negate;
export const none = negate(overEvery);
export const or = rest(overSome)
export const xor = fn=>pipe(filter(fn),len1);
// debugging
export const plog = (fromDev)=>(...fromPipe)=>{console.log(fromDev,...fromPipe);return fromPipe[0];}


// casting
export const argsToArray = rest;
export const arrayToArgs = spread;
export const ensureArray = (val=[])=>isArray(val) ? val : [val];
export const ensureFunction = ifElse(isFunction,identity,constant)
export const ensureProp = fn=>(obj,key)=>obj.hasOwnProperty(key) ? obj[key] : (obj[key]=fn());
export const ensureArrayProp = ensureProp(stubArray);
export const ensureObjectProp = ensureProp(stubObject);
export const arity1 = unary;
export const toEmptyCopy = cond([
  [isArray,stubArray],
  [isPlainObject,stubObject],
  [isString,stubString],
  [isWeakMap,()=>new WeakMap()],
  [isWeakSet,()=>new WeakSet()],
  [isMap,()=>new Map()],
  [isSet,()=>new Set()],
  [stubTrue,identity]
]);




// flow control
// export const pipe=(fn1,...fns)=>(arg1,...args)=>fns.reduce((a,f)=>f(a), fn1(arg1,...args));
// export const pipe=(fn1,...fns)=>(arg1,...args)=>fns.reduce((a,f)=>f(a), fn1(arg1,...args));

export const slice = (...sliceArgs)=>arr=>arr.slice(...sliceArgs);
export const reverse = arr=>arr.slice(0).reverse(); // immutable array reverse
export const pipe = (fn1=identity,...fns)=>(arg1,...args)=>fns.reduce((a,f)=>f(a),fn1(arg1,...args));
export const compose = (...fns)=>pipe(...fns.reverse());
export const dataPipe = (...args)=>{
  let next, acc=[], i=-1;
  while((next=args[++i])){
    if(typeof next === 'function'){break;}
    acc[i]=next;
  }
  if(i===args.length){return acc;}
  acc = next(...acc);
  while((next=args[++i])){acc=next(acc);}
  return acc;
}
export const dpipe = dataPipe;










// content
export const lorem = (count=50)=>(new Array(count)).fill('lorem').join(' ');
export const cycle = (...args)=>{ // cycles between all values passed in
  let mod = -1;
  return ()=>args[++mod % args.length]
}




// collections
// shortcuts for the most common collection operations
// prefixes = r,m,f,o,fm = reduce,map,filter,omit,filter+map
// suffixes = o,a,x = toObject,toArray,toX (where X is the same type as input)
export const ro=fn=>(...args)=>transform(fn,{})(...args);
export const ra=fn=>(...args)=>transform(fn,[])(...args);
export const ma=map;
export const mo=fn=>ifElse(isArray,ro((acc,v,i,c)=>{acc[i]=fn(v,i,c);}),mapValues)(fn);
export const mx=fn=>coll=>(isArray(coll)?map:mapValues)(fn)(coll);
export const fa=filter;
export const fo=pred=>ifElse(
  isArray,ra((acc,v,k,c)=>{if(pred(v,k,c)){acc[acc.length]=v;}}),pickBy(pred));
export const fx=pred=>coll=>(isArray(coll)?fa:pickBy)(pred)(coll);
export const oa=pipe(not,fa);
export const oo=pipe(not,fo);
export const ox=pipe(not,fx);
export const fma=(pred,fn)=>ra((acc,v,k,c)=>{if(pred(v,k,c)){acc[acc.length]=fn(v,k,c);}});
export const fmo=(pred,fn)=>ro((acc,v,k,c)=>{if(pred(v,k,c)){acc[k]=fn(v,k,c);}});
export const fmx=(pred,fn)=>coll=>(isArray(coll)?fma:fmo)(pred,fn)(coll);
// legacy
export const mapvToArr = ma;
export const fltrv = fx;
export const omitv = ox;
export const mapv = mx;

export const pget = cond(
  [isString,get],
  [isArray,pick],
  [isPlainObject, obj=>target=>mo(f=>pget(f)(target))(obj)],
  [stubTrue,identity], // handles the function case
);



export const sort = (...args)=>arr=>arr.sort(...args)
export const toggleArrayVal = ifElse(v=>a=>a.includes(v),reject,v=>a=>[...a,v]);
export const transformToObj = fn=>obj=>transform(fn,{})(obj);
// groupByProps: like groupBy https://lodash.com/docs/4.17.5#groupBy
// but enables returning an object
// sort of like Object.assign({},...map(groupBy)(collection))
export const groupByProps = (propTransformer=identity)=>transformToObj((dest,src)=>{
  forOwn((val,key)=>{propTransformer(dest[key],src[key],key,dest,src)})(src);
});
export const assignPropsToArrays = groupByProps((dv,sv,k,d,s)=>ensureArrayProp(d,k).push(sv));
export const groupByKey = (key,nestedKey='id')=>{
  let k;
  if(isString(nestedKey)){nestedKey = get(nestedKey);}
  return ro((acc,next,originalKey)=>{
    k = next[key];
    acc[k] || (acc[k] = {});
    acc[k][nestedKey(next)]=next;
  });
};
export const groupByKeys = groupByProps((dv,sv,k,d,s)=>ensureArrayProp(d,k).push(s))
export const groupByValues = groupByProps((dv,sv,k,d,s)=>ensureArray(sv).forEach(v=>ensureArrayProp(d,v).push(s)));
// const aColl = [{a:[1,2]}, {b:[2]}, {c:[1,3]}];
// groupByKey('a')(aColl) // {a:[{a:[1,2]}]}
// groupByKeys(aColl) // {a:[{a:[1,2]}],b:[{b:[2]}],c:[{c:[1,3]}]}
// groupByValues(aColl) // {1: [{a:[1,2]},{c:[1,3]}], 2: [{a:[1,2]},{b:[2]}], 3: [{c:[1,3]}]}
// pipe(map(pick(['a','b'])),groupByValues)(aColl) // {1:[{a:[1,2]}], 2:[{a:[1,2]}, {b:[2]}]}
// const oColl = {a:{d:[1,2]}, b:{d:[2]}, c:{d:[1,3]}};
// groupByKey('d')(oColl) // {d:[{d:[1,2]},{d:[2]},{d:[1,3]}]}
// groupByKeys(oColl) // {d:[{d:[1,2]},{d:[2]},{d:[1,3]}]}
// groupByValues(aColl) // {1:[{d:[1,2]},{d:[1,3]}], 2:[{d:[1,2]},{d:[2]}], 3:[{d:[1,3]}]}
export const getMatchReplacer = replacer=>(p,f)=>replacer(p,ensureFunction(f));

export const replaceInSelf = getMatchReplacer((predicate,getReplacement)=>collection=>transform((d,sv,k,s)=>{
  if(predicate(sv,k,s)) {d[k] = getReplacement(sv,k,s)}
},collection)(collection));

export const replaceInCopy = getMatchReplacer((predicate,getReplacement)=>collection=>transform((d,sv,k,s)=>{
  d[k] = predicate(sv,k,s) ? getReplacement(sv,k,s) : sv
},toEmptyCopy(collection))(collection));

export const replaceInEmpty = getMatchReplacer((predicate,getReplacement)=>collection=>transform((d,sv,k,s)=>{
  if(!predicate(sv,k,s)) {return;}
  if(isArray(d)){k=d.length}
  d[k] = getReplacement(sv,k,s)
},toEmptyCopy(collection))(collection));

export const concatAfter = getMatchReplacer((predicate,getReplacement)=>collection=>collection.reduce((d,sv,k,s)=>{
  d[d.length]=sv;
  console.log(`predicate(sv,k,s)`, sv,k,s);
  if(predicate(sv,k,s)){d.push(...ensureArray(getReplacement(sv,k,s)))}
  return d;
},[]));

export const concatBefore = getMatchReplacer((predicate,getReplacement)=>collection=>collection.reduce((d,sv,k,s)=>{
  if(predicate(sv,k,s)){d.push(...ensureArray(getReplacement(sv,k,s)))}
  d[d.length]=sv;
  return d;
},[]));




// Objects
export const objStringifierFactory = ({
  getPrefix=()=>'',
  getSuffix=()=>'',
  mapPairs=x=>x,
  keySplit = '=',
  pairSplit = '&'
} = {})=>(input={})=>{
  const output = Object.keys(input)
  .map(k=>([k, input[k]].map(mapPairs).join(keySplit)))
  .join(pairSplit);
  return getPrefix(input,output) + output + getSuffix(input, output);
};
export const objToUrlParams = objStringifierFactory({
  getPrefix:(input,output)=>output ? '?' : '',
  mapPairs:encodeURIComponent,
});

// partionObject((v,k)=>k=='a')({a:1,b:2,c:3}) =>[{a:1},{b:1,c:2}]
// partionObject((v,k)=>v==1)({a:1,b:2,c:3}) =>[{a:1,b:1},{c:2}]
export const partitionObject = (...predicates)=>(target)=>{
  const defaultCase = {...target};
  return predicates.map(test=>{
    return transform((acc,val,key)=>{
      if(!test(val,key)){return;}
      acc[key]=val;
      delete defaultCase[key];
    },{})(defaultCase);
  }).concat([defaultCase]);
}

export function shallowEqual(objA, objB) {
    //From: https://github.com/facebook/fbjs/blob/c69904a511b900266935168223063dd8772dfc40/packages/fbjs/src/core/shallowEqual.js
    if (is(objA, objB)) return true
    if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
        return false
    }
    const keysA = Object.keys(objA)
    const keysB = Object.keys(objB)
    if (keysA.length !== keysB.length) return false
    for (let i = 0; i < keysA.length; i++) {
        if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
            return false
        }
    }
    return true
}

// Math
export const round = Math.round.bind(Math);
