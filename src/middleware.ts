import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

const authMiddleware = (req: NextRequest, res: NextResponse) => {
    const jwt = req.cookies.get('jwt')?.value;
    let url = req.url;

    /* if(!jwt && url.includes('/admin')){
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`)
    } */
}

export default authMiddleware;