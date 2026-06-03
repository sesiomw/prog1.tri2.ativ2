// vamos falar sobre api rest

const server = Bun.serve({
    port: 3000,
    routes: {
        "/api-debugger": Bun.file('public/api-debugger.html'),
        "/teste": {
            GET: Response.json({ time: Date.now() }),
            PUT: Response.json({ time: Date.now() }),
            POST: Response.json({ time: Date.now() }),
            DELETE: Response.json({ time: Date.now() })
        }
    },
    fetch() {
        return new Response('Not Found', { status: 404 })
    }
})

console.log('Server running on port: http://localhost:${server.port}')