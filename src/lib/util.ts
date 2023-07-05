export function nonan<T>(i:T):T{
    if (typeof i=='number'){
        if (isNaN(i)){
            throw Error("value can not be NaN!")
        }
        return i
    }
    else{
        return i
    }
}