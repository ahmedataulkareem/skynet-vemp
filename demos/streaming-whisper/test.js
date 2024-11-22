const MEETINGID = crypto.randomUUID()
ws = new WebSocket('wss://' + host + '/streaming-whisper/ws/' + MEETINGID)
ws.binaryType = 'blob'


function preparePayload(data) {
    let lang = "ro"
    let str = CLIENTID + "|" + lang
    if (str.length < 60) {
        str = str.padEnd(60, " ")
    }
    let utf8Encode = new TextEncoder()
    let buffer = utf8Encode.encode(str)

    let headerArr = new Uint16Array(buffer.buffer)

    const payload = []

    headerArr.forEach(i => payload.push(i))
    data.forEach(i => payload.push(i))

    return Uint16Array.from(payload)
}

recorder.port.onmessage = (e) => {
    const audio = convertFloat32To16BitPCM(e.data)
    const payload = preparePayload(audio)
    ws.send(payload)
}