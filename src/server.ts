import TodoList, { Item } from './core'
const todolist = new TodoList('todolist.json')

async function requestTest(req: Bun.BunRequest) {
  return Response.json({
    method: req.method,
    time: new Date().toLocaleString('pt-BR'),
    body: await req.body?.text(),
  });
}

const server = Bun.serve({
    port: 3000,
    routes: {
        "/api-debugger": Bun.file('public/api-debugger.html'),
        "/test": {
            GET: () => Response.json({ time: Date.now() }),
            PUT: () => Response.json({ time: Date.now() }),
            POST: () =>  Response.json({ time: Date.now() }),
            DELETE: () => Response.json({ time: Date.now() })
        }
    },
    fetch() {
        return new Response('Not Found', { status: 404 })
    }
})

console.log(`Server running at http://localhost:${server.port}`);
