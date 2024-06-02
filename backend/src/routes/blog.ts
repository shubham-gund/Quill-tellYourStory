import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { createBlogInput, updateBlogInput } from "@shubham_gund_02/medium-common";
import moment from 'moment'

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables: {
    userId: string
  }
}>();

// Middleware for JWT verification
blogRouter.use('/*', async (c, next) => {
  const header = c.req.header('authorization') || ''; // Bearer token
  const token = header.split(' ')[1]; // token
  try {
    const user = await verify(token, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({ error: 'Unauthorized' });
    }
  } catch (error) {
    console.error('JWT Verification Error:', error);
    c.status(403);
    return c.json({ error: 'Unauthorized' });
  }
});

// Post blog
blogRouter.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({
        message: "Inputs not correct"
      });
    }
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
        createdOn: moment().format('Do MMMM YYYY') // Set current date and time
      }
    });

    await prisma.$disconnect(); // Properly close the Prisma Client connection

    return c.json({ id: blog.id });
  } catch (error) {
    console.error('Error in POST /blog:', error); // Log the error details
    c.status(500);
    return c.json({ message: "Internal server error" });
  }
});

// Edit blog
blogRouter.put("/", async (c) => {
  try {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({
        message: "Inputs not correct"
      });
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.update({
      where: {
        id: body.id
      },
      data: {
        title: body.title,
        content: body.content
      }
    });

    await prisma.$disconnect(); // Properly close the Prisma Client connection

    return c.json({ id: blog.id });
  } catch (error) {
    console.error('Error in PUT /blog:', error); // Log the error details
    c.status(500);
    return c.json({ message: "Internal server error" });
  }
});

blogRouter.get("/search",async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const query = c.req.query("query"); // Assuming the query parameter is named "query"

  try {
    const matchingBlogs = await prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: query }},
          { content: { contains: query } },
        ],
      },
      select: {
        content: true,
        title: true,
        id: true,
        createdOn: true,
        author: {
          select: {
            name: true
          }
        }
      }
    });
    return c.json({
      error: false,
      blogs: matchingBlogs,
      message: "Blogs fetched successfully"
    });
  }
  catch(error){
    console.log(error);
  }
})

// Get all the blogs
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blogs = await prisma.post.findMany({
      orderBy: {
        createdOn: 'desc', // Order by createdOn in descending order
      },
      select: {
        content: true,
        title: true,
        id: true,
        createdOn: true,
        author: {
          select: {
            name: true
          }
        }
      }
    });

    await prisma.$disconnect(); // Properly close the Prisma Client connection

    return c.json({ blogs });
  } catch (error) {
    console.error('Error in GET /bulk:', error); // Log the error details
    c.status(500);
    return c.json({ msg: "Something went wrong" });
  }
});


//get blogs posted by the user

// Get personal blogs
blogRouter.get("/myblogs", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");


  try {
    const myBlogs = await prisma.post.findMany({
      where: {
        authorId: userId
      },
      orderBy: {
        createdOn: 'desc', // Order by createdOn in descending order
      },
      select: {
        content: true,
        title: true,
        id: true,
        createdOn: true,
        author: {
          select: {
            name: true
          }
        }
      }
    });

    return c.json({ blogs: myBlogs });
  } catch (error) {
    console.error('Error in GET /myblogs:', error); // Log the error details
    c.status(500);
    return c.json({ msg: "Something went wrong" });
  }
});





// Get a particular blog
blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: id
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdOn: true,
        author: {
          select: {
            name: true
          }
        }
      }
    });

    await prisma.$disconnect(); // Properly close the Prisma Client connection

    return c.json({ blog });
  } catch (error) {
    console.error('Error in GET /:id:', error); // Log the error details
    c.status(500);
    return c.json({ message: "Error while fetching blog post" });
  }
});


// Delete a particular blog
blogRouter.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const deletedBlog = await prisma.post.delete({
      where: {
        id: id
      }
    });

    await prisma.$disconnect(); 

    return c.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error('Error in DELETE /:id:', error); 
    c.status(500);
    return c.json({ message: "Error while deleting blog post" });
  }
});
