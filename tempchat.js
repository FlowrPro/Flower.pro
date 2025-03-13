(function() {
    
        const input = document.getElementById('chat-input')
        const log = document.getElementById('chat-log')

        document.addEventListener("keypress", (e) => {
            if (e.key == 'Enter') {
                if (document.hasFocus(input) && input.value) {
                    if (!socket.id) return
                    socket.emit('chat message', ({ id: socket.id, msg: input.value }));
                    input.value = ''
                } else {
                    input.focus()
                }
            }
        });

        socket.on('chat message', ({ id, msg }) => {
			sendMsg(id, msg)
        })

        function sendMsg(id, msg) {
            const textContainer = document.createElement('div')
            textContainer.style.display = 'flex'
            textContainer.width = '100%'
            textContainer.height = '20px'
            const text = document.createElement('span')
            if (id == socket.id) {
                text.innerHTML = 'YOU: '
            } else {
                text.innerHTML = ' : '
            }
            text.innerHTML += msg
            text.style.whiteSpace = 'nowrap'
            text.style.margin = '3px'
            text.style.marginLeft = '5px'

            textContainer.appendChild(text)
            log.appendChild(textContainer)
        }
    })()
