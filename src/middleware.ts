
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    // const token = req.cookies.get('token')?.value
    // if(!token){
    //     return NextResponse.redirect(new URL('/user-authentication' , req.url))
    // }
  
}

export const config = {
  matcher: ["/profile"],
};