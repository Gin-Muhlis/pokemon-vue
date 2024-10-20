export function handleModal(id, type) {
    const element = document.getElementById(id)

    if (type == 'open') {
        element.showModal()
    } else {
        element.close()
    }
}