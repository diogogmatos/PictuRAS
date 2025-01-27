# 🖌️ PictuRAS

![Untitled](https://github.com/user-attachments/assets/60860cff-47d5-4c1f-b9fb-d8ba5eec4111)

**PictuRAS** is a web app developed as part of the "Requisitos e Arquiteturas de Software" course for the academic year 2024/2025, as a part of the **Software Engineering Master's Degree**. Its main goal is to provide a powerful and easy to use image editing platform, with support for bulk editing, advanced AI-powered features and user accounts with different subscription levels.

The project used a microservices architecture, with services dedicated to project management, user/session management, tools and a gateway, with whom the frontend communicates.

## 🏆 Results
> 🏅 **19/20**

## 📒 Features

### Landing

![Screen Shot 2025-01-27 at 16 33 01](https://github.com/user-attachments/assets/f6440693-ddba-42ea-a6fd-f7d8e9117427)

### Dashboard

![Screen Shot 2025-01-27 at 17 18 44](https://github.com/user-attachments/assets/42630a22-94f3-40a9-871e-6574ecc7dd72)

### New Project Dialog

<img src="https://github.com/user-attachments/assets/29a7ad12-69d9-4d9a-a72e-1b0945fb2224" width="700px"/>

### Project Search

<img src="https://github.com/user-attachments/assets/e45214e9-aef6-4b44-af6f-e9df909baa23" width="400px"/>

### Project Renaming

<img src="https://github.com/user-attachments/assets/ab91204d-28e3-4640-88a5-6432e486da3e" width="500px" />

### Account Dialog

<img src="https://github.com/user-attachments/assets/80ed7db7-808f-4852-b231-fda7d13eb8f8" width="500px" />

### Project View

- **Grid View**

![Screen Shot 2025-01-27 at 16 35 09](https://github.com/user-attachments/assets/dc9faa29-397b-4841-8743-198dce078654)

- **Carousel View** (swipe gesture compatible)

![Screen Shot 2025-01-27 at 16 36 46](https://github.com/user-attachments/assets/2f0b8290-042b-4937-aea3-f3bcf5b3f082)

- **Header Toolbar**

![Screen Shot 2025-01-27 at 16 35 09-1](https://github.com/user-attachments/assets/47b09f16-c3ab-40d2-9d8b-9d60eaf58fee)

- **Tool Dialog**

<img src="https://github.com/user-attachments/assets/f14859b0-a794-4188-bd85-d07a86e59dc7" width="500px"/>

- **Edit Preview**

![Screen Shot 2025-01-27 at 16 38 54](https://github.com/user-attachments/assets/30d99558-f2ef-4ea3-a5a3-d22a0dbe7e0b)

- **Bulk Image Editing Progress** (using websockets)

![Screen Shot 2025-01-27 at 16 39 07](https://github.com/user-attachments/assets/b7a3e44b-7982-4b24-a29e-b7a6274d5452)

- **Results View**

![Screen Shot 2025-01-27 at 16 39 30](https://github.com/user-attachments/assets/a1670660-78a8-4768-bb04-81ff3d95aff9)

- **Individual Image Actions** (right-click/hold enabled)

![Screen Shot 2025-01-27 at 16 39 44](https://github.com/user-attachments/assets/cfc5344a-f5f6-4758-9272-ddb32c18ac63)

### Account Management

- **Personal Info.**

![Screen Shot 2025-01-27 at 16 46 01](https://github.com/user-attachments/assets/f5fc9214-dd2d-4fc0-b9ab-bda2f1b1439a)

- **Billing**

![Screen Shot 2025-01-27 at 16 45 54](https://github.com/user-attachments/assets/f21607c1-d2f0-4d97-9004-4ddca547a864)

- **Upgrade to Premium**

![Screen Shot 2025-01-27 at 16 45 51](https://github.com/user-attachments/assets/d4613f03-3425-49b9-b4b8-9fc60a6cc332)

### Sign In

![Screen Shot 2025-01-27 at 16 46 45](https://github.com/user-attachments/assets/495f2aa9-e947-4178-be8b-21f07b23fbd2)

### Sign Up

![Screen Shot 2025-01-27 at 16 47 10](https://github.com/user-attachments/assets/8d7c7cd7-8d2d-4d4b-a622-ecade002988c)

## 🔨 Development

From the repository root, run:

```sh
docker compose up --build -d
```

Frontend available on port `3000`.

## 🚀 Powered By

### Frontend

- [**Next.js**](https://nextjs.org/)
- [**shadcn/ui**](https://ui.shadcn.com/)
- [**tailwindcss**](https://tailwindcss.com/)
- [**TanStack Query**](https://tanstack.com/query/latest/docs/framework/react/overview)
- [**Axios**](https://axios-http.com/docs/intro)
- [**Socket.IO**](https://socket.io/)

### Backend

- [**Express.js**](https://expressjs.com/)
- [**RabbitMQ**](https://www.rabbitmq.com/)
- [**MinIO**](https://min.io/)
- [**MongoDB**](https://www.mongodb.com/)
- [**Socket.IO**](https://socket.io/)

### Deployment

- [**Docker**](https://www.docker.com/)

## 👥 Team

- Diogo Gomes Matos
- [Guilherme João Fernandes Barbosa](https://github.com/Kard9876)
- [José Filipe Ribeiro Rodrigues](https://github.com/FilipeR13)
- [Juciano Gomes Farias Júnior](https://github.com/Juciano-Farias)
- [Nuno Ricardo Silva Gomes](https://github.com/nunogomes255)
