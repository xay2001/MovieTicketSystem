import service from "../utils/request";

export function CreateActivity(data) {
    return service({
        url: '/activity',
        method: 'post',
        data: data
    })
}

export function ListAllActivity() {
    return service({
        url: '/activity',
        method: 'get'
    })
}

export function FindActivityById(id) {
    return service({
        url: '/activity/' + id,
        method: 'get'
    })
}

export function DeleteActivityById(id) {
    return service({
        url: '/activity/' + id,
        method: 'delete'
    })
}
