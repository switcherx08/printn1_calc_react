export function activePostpress (state) {
    let postpressArr = []
    for (let i in state){
        if(state[i].isActive){
            postpressArr.push(state[i].id)
        }
    }
     if (postpressArr.length === 0) {
        postpressArr.push(0)
    }

    return String(postpressArr)
}

