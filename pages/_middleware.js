import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export default function middleware(req) {
    const { cookies } = req;

    const jwtToken = cookies.token;
    // const isAdmin = false;

    const url = req.url;

    if (url.includes("/dashboard/user")) {
        if (jwtToken === undefined) {
            return NextResponse.redirect("http://localhost:3000/login");
        } else {
            try {
                jwt.verify(jwtToken, process.env.SECRET);
                const decode = jwt.verify(jwtToken, process.env.SECRET);
                if (jwt.verify(jwtToken, process.env.SECRET) && !decode.isAdmin) {
                    const decode = jwt.verify(jwtToken, process.env.SECRET);
                    console.log(decode);
                    return NextResponse.next();
                } else {
                    return NextResponse.redirect("http://localhost:3000/");
                }
            } catch (error) {
                return NextResponse.redirect("http://localhost:3000/login");
            }
        }
    }

    if (url.includes("/dashboard/admin")) {
        if (jwtToken === undefined) {
            return NextResponse.redirect("http://localhost:3000/login");
        } else {
            try {
                jwt.verify(jwtToken, process.env.SECRET);
                const decode = jwt.verify(jwtToken, process.env.SECRET);
                if (jwt.verify(jwtToken, process.env.SECRET) && decode.isAdmin) {
                    return NextResponse.next();
                } else {
                    return NextResponse.redirect("http://localhost:3000/");
                }
            } catch (error) {
                return NextResponse.redirect("http://localhost:3000/login");
            }
        }
    }

    if (url.includes("/login")) {
        if (jwtToken) {
            try {
                jwt.verify(jwtToken, process.env.SECRET);
                return NextResponse.redirect("http://localhost:3000");
            } catch (error) {
                return NextResponse.next();
            }
        } else {
            return NextResponse.next();
        }
    }
    return NextResponse.next();


}