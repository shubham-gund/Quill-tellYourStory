import { Hono } from "hono";
import { sign } from "hono/jwt";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import {signupInput,signinInput} from "@shubham_gund_02/medium-common"

export const userRouter = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
  }
}>();



// Signup endpoint
userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message:"Inputs not correct"
      })
    } 
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt,name:user.name });
  } catch (e) {
    console.error('Signup Error:', e);
    c.status(500);
    return c.json({ error: 'Error while signing up' });
  }
});

// Signin endpoint
userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message:"Inputs not correct"
      })
    }
    const user = await prisma.user.findFirst({
      where: {
        email: body.email
      },
    });
    if (!user) {
      c.status(403);
      return c.json({ error: 'User not found' });
    }

    if (body.password != user.password) {
      c.status(403);
      return c.json({ error: 'Invalid credentials' });
    }
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt,name:user.name });
  } catch (e) {
    console.error('Signin Error:', e);
    c.status(500);
    return c.json({ error: 'Error while signing in' });
  }
});
