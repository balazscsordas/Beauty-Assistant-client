import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

const authMiddleware = (req: NextRequest ) => {
    /* const jwt = req.cookies.get('jwt')?.value;
    const res = NextResponse.next()
    let url = req.url;

    if(!jwt && url.includes('/admin')){
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/`)
    } */
}

export default authMiddleware;