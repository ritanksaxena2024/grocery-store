'use server'
import { cookies } from "next/headers";
import { User } from "../../model/application.types";
import { supabase } from "../supabase/connection";
import jwt from "jsonwebtoken";

type AuthResult = {
  message: string;
  user: User ;
  token: string;
  type?: string;
  role_id?: number;
  
} | Error;

export const authenticateUser = async (
  email: string,
  password: string,
  type: string
): Promise<AuthResult> => {
  try {
    if (type === '2') {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .limit(1);

      const user = data?.[0];

      if (error) throw new Error(error.message);
      if (!user) throw new Error("User not found");
      if (user.password !== password) throw new Error("Incorrect password");

      const token = jwt.sign(
        { email: user.email, type },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      return {
        message: "Authentication Successful",
        user,
        token,
        type
      };

    } else if (type === '1') {
       console.log("details got", email , password , type)
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .limit(1);

      const user = data?.[0];

      if (error) throw new Error(error.message);
      if (!user) throw new Error("User not found");
      if (user.password !== password) throw new Error("Incorrect password");

      const token = jwt.sign(
        { email: user.email, type },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );
    if(token){
     const cookieStore = cookies(); 
    (await cookieStore).set('token', token, {
    path: '/',
    maxAge: 60 * 60, 
    httpOnly: true,
  });
    }
      return {
        message: "Authentication Successful",
        user,
        token,
        type
      };
    }

    return new Error("Invalid user type");

  } catch (err) {
    return err as Error;
  }
};


export const userCreation = async (
  email: string,
  password: string,
  role_id: number
): Promise<AuthResult> => {
  try {
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          email,
          password,
          role_id,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .limit(1);

    const user = data?.[0];

    if (error) throw new Error(error.message);
    if (!user) throw new Error("User not created");

    const token = jwt.sign(
      { email: user.email, role_id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    if(token){
     const cookieStore = cookies(); 
    (await cookieStore).set('token', token, {
    path: '/',
    maxAge: 60 * 60, 
    httpOnly: true,
  });
    }
    return {
      message: "User created successfully",
      user,
      token,
      role_id,
    };
  } catch (err) {
    return err as Error;
  }
};