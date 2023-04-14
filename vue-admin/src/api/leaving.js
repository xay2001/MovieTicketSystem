import service from "../utils/request";

export function CreateLeavingMessage(data) {
    return service({
        url: '/lm',
        method: 'post',
        data: data
    })
}

export function ReplyLeavingMessage(data) {
    return service({
        url: '/lm',
        method: 'put',
        data: data
    })
}

export function ListAllLeavingMessage() {
    return service({
        url: '/lm',
        method: 'get'
    })
}

export function ListActiveUser() {
    return service({
        url: '/lm/active',
        method: 'get'
    })
}


export function ListWorkerEvaluate(id) {
    return service({
        url: '/we?id=' + id,
        method: 'get'
    })
}

export function CreateEvaluate(data) {
    return service({
        url: '/we',
        method: 'post',
        data: data
    })
}