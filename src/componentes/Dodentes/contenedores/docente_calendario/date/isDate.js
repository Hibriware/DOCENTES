
export const isDatesHigher=(dataOne,dateTwo)=>{ // <
    if( (new Date(dataOne).getTime() < new Date(dateTwo).getTime())){
                return true;
        }
        return false
}

export const isDatesHigherEqual=(dataOne,dateTwo)=>{// >=
    if( (new Date(dataOne).getTime() >= new Date(dateTwo).getTime())){
                return true;
        }
        return false
}

export const isDatesDifferent=(dataOne,dateTwo)=>{// >=
    if( (new Date(dataOne).getTime() !== new Date(dateTwo).getTime())){
                return true;
        }
        return false
}

export const  menorIgual=(dataOne,dateTwo)=>{
    if( (new Date(dataOne).getTime() <= new Date(dateTwo).getTime())){
        return true;
}
return false
}

export const  dateMayor=(dataOne,dateTwo)=>{
    if( (new Date(dataOne).getTime() > new Date(dateTwo).getTime())){
        return true;
}
return false
}

export const  dateMenor=(dataOne,dateTwo)=>{
    if( (new Date(dataOne).getTime() < new Date(dateTwo).getTime())){
        return true;
}
return false
}