import { Application, Context, Router, send } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { searchDictionaryResults } from "./dictionary.ts"
import { searchGiphy } from "./giphy.ts"
import { getDataSet, listDataSet } from "./game-data/index.ts";
export const VERSION = 'v0.2.0'

const app = new Application();
const router = new Router();

// Enable CORS using oakCors middleware
app.use(
    oakCors({
        origin: "*", // You can change this to a specific origin or an array of origins
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
);

// Define /search route
router.get("/search", async (ctx) => {
    const term: string | null = ctx.request.url.searchParams.get('term');
    console.info(`Processing request to ${ctx.request.url.pathname} :: term=${term}`);
    ctx.response.status = 200;
    ctx.response.body = await searchDictionaryResults(term);
});

// Define /game route
router.get("/game-data", async (ctx) => {
    const set: string | null = ctx.request.url.searchParams.get('set');
    if (set) {
        console.info(`Processing request to ${ctx.request.url.pathname} :: set=${set}`);
        ctx.response.status = 200;
        ctx.response.body = getDataSet(set)
    } else {
        console.info(`Processing request to ${ctx.request.url.pathname} :: returning all sets on file`);
        ctx.response.status = 200;
        ctx.response.body = listDataSet()
    }
});

// Define /gif route
router.get("/gif", async (ctx) => {
    const term: string | null = ctx.request.url.searchParams.get('term');
    console.info(`Processing request to ${ctx.request.url.pathname} :: term=${term}`);
    ctx.response.status = 200;
    ctx.response.body = await searchGiphy(term || 'missing');
});

router.get("/dict", async(ctx) => {
    ctx.response.redirect('/');
});

// Define /version route
router.get("/version", async (ctx) => {
    ctx.response.status = 200;
    ctx.response.body = VERSION;
});

// Define / for client requests and static files
const serveStatic = async (ctx: Context) => {
    console.info('SERVING STATIC FILE .... ', ctx.request.url.pathname);
    await send(ctx, ctx.request.url.pathname, {
        root: "./build",
        index: "index.html", // Optional: specify an index file
    });
}
router.get('/', serveStatic);
router.get('/:file*', serveStatic);


app.use(router.routes());
app.use(router.allowedMethods());

// Start the server
const PORT = 8000;
console.log(`Server is running on http://localhost:${PORT}`);
await app.listen({ port: PORT });