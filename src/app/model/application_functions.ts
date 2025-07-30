export const generateRandomColor=(): string=>{
    const letters = '0123456789ABCDEF'
    let colors = '#'
    for(let i=0;i<6;i++){
        colors += letters[Math.floor(Math.random() * 16)]
    }
    return colors
}

export const getInitials=(name: string)=>{
    if(!name) {
        return undefined
    }

    const initials = name.trim().split(" ").filter(Boolean)
    if(initials.length ===1){
        return initials[0][0].toUpperCase()
    }

    return (initials[0][0] + initials[initials.length-1][0]).toUpperCase()
}