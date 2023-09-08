import { serve } from "https://deno.land/std@0.116.0/http/server.ts";
import staticFiles from "https://deno.land/x/static_files@1.1.6/mod.ts";

const serveFiles = (req) => {
    if (/\/(home|projects|resume)/i.test(req.url)) {
        console.info('APP PATH DETECTED: redirecting ...');
        return Response.redirect(req.url.replace(/\/(home|projects|resume)/, '/'), 302);
    }
    return staticFiles('build')({ 
        request: req,
        respondWith: (r: Response) => r,
    });
}

serve((req) => {
    return serveFiles(req)
}, { addr: ':9000' });