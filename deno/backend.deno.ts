import { Application, Router } from "https://deno.land/x/oak/mod.ts";
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

app.use(router.routes());
app.use(router.allowedMethods());

// Start the server
const PORT = 8000;
console.log(`Server is running on http://localhost:${PORT}`);
await app.listen({ port: PORT });