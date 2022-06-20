
// need to create a target array, use catNames.
const addToTarget  = (newitem) =>{
    let storedTarget = [...target] 
    storedTarget.push(newitem)
    setTarget(storedTarget)    
    adder(newitem)
}