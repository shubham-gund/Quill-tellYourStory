
# Quill

Welcome to **Quill**, the ultimate platform for storytellers! Quill empowers users to craft, share, and explore stories in an engaging and interactive community. Whether you're an aspiring writer, a seasoned author, or a reader who loves to delve into creative narratives, Quill offers a seamless experience tailored just for you.

Built with the latest technologies, Quill ensures a smooth and secure environment for all its users. Our robust infrastructure, powered by TypeScript, React, Hono, Cloudflare Workers, and PostgreSQL, guarantees high performance and reliability. With secure JWT-based authentication, your personal data and stories are always safe.

Join Quill today and become part of a vibrant community where stories come to life!

---

### Features

- **Create, Edit, Delete Stories**: Seamlessly manage your own stories with our user-friendly interface.
- **View Stories**: Dive into a vast collection of stories created by other users.
- **Edit Profile**: Update your display name and password to keep your profile current and secure.
- **JWT-based Authentication**: Experience secure login and profile management.
- **Search Stories**: Easily find stories using our powerful search functionality.
- **Interactive Community**: Engage with fellow storytellers and readers.

### Tech Stack

- **Front-end**: React, TypeScript
- **Back-end**: Hono (Cloudflare Workers)
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)
- **Hosting**: Cloudflare Workers

### Getting Started

#### Prerequisites

- Node.js (v14 or later)
- PostgreSQL

#### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/shubham-gund/quill.git
    cd quill
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Set up the environment variables**

    Create a .env file to store your postgres url
   
    In wrangler.toml : 

       DATABASE_URL=your_prisma_accelerate-url

       JWT_SECRET=your_jwt_secret

4. **Run the development server**
    ```bash
    npm run dev
    ```

### Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code follows the existing coding standards and includes appropriate tests.

