// import { serve } from "https://deno.land/std@0.116.0/http/server.ts";
// import staticFiles from "https://deno.land/x/static_files@1.1.6/mod.ts";
import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { searchDictionaryResults } from "./dictionary.ts"
import { searchGiphy } from "./giphy.ts"


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
    const term  = ctx.request.url.searchParams.get('term');
    console.info(`Processing request to ${ctx.request.url.pathname} :: term=${term}`);
    ctx.response.status = 200;
    ctx.response.body = await searchDictionaryResults(term);
});

// Define /gif route
router.get("/gif", async (ctx) => {
    const term  = ctx.request.url.searchParams.get('term');
    console.info(`Processing request to ${ctx.request.url.pathname} :: term=${term}`);
    ctx.response.status = 200;
    ctx.response.body = await searchGiphy(term);
});

router.get("/version", async (ctx) => {
    ctx.response.status = 200;
    ctx.response.body = `v0.1.0`;
});

const serveStatic = async (ctx) => {
    console.info('SERVING STATIC FILE .... ', ctx.request.url.pathname);
    await send(ctx, ctx.request.url.pathname, {
        root: "../frontend/build",
        index: "index.html", // Optional: specify an index file
    });
}
router.get('/', serveStatic);
router.get('/assets/:path*', serveStatic);
router.get('/static/:path*', serveStatic);

app.use(router.routes());
app.use(router.allowedMethods());

// Start the server
const PORT = 8000;
console.log(`Server is running on http://localhost:${PORT}`);
await app.listen({ port: PORT });