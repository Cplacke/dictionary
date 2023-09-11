import { serve } from "https://deno.land/std@0.116.0/http/server.ts";
import staticFiles from "https://deno.land/x/static_files@1.1.6/mod.ts";

// FRONT END SERVER, returns the react application

const serveFiles = async (req) => {
    return staticFiles('build')({ 
        request: req,
        respondWith: (r: Response) => r,
    });
}

serve(async (req) => {
    return await serveFiles(req)
}, { 
    addr: ':3001',
});